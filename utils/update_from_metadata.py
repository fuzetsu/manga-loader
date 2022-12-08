from typing import Iterable, Dict
from functools import partial
from pathlib import Path
import json
from dictdiffer import diff, patch
import sys


COMMENT_SYMBOL = r'//'
REGEX_ESCAPE = r'.'
METADATA_KEYS = ["match", "mapto"]
SUBREPO_DEFAULT_EXCLUDE = ["old_raw", "sample"]


def uncomment_line(line: str):
    is_comment = line.startswith(COMMENT_SYMBOL)
    return line[len(COMMENT_SYMBOL):].strip() if is_comment else False

def match_lines(lines: Iterable[str], key: str):
    try:
        line = next(filter(lambda l: l.startswith(key), lines))
        return [x.strip() for x in line.split(':', 1)]
    except StopIteration:
        # no matching lines
        return [key, None]

def read_metadata(lines: Iterable[str]):
    metadata_lines = filter(None, map(uncomment_line, lines))
    metadata_kvs = map(partial(match_lines, metadata_lines), METADATA_KEYS)
    return {k:v for k, v in metadata_kvs}

def regex_unescape(astr: str):
    for c in REGEX_ESCAPE:
        astr = astr.replace(r'\%s' % c, c)
    return astr

def collect_repo_info(repo_dir: Path) -> Dict[str, Dict[str, Dict[str, str]]]:
    all_repo_info = {}
    subdirs = filter(lambda p: p.is_dir(), repo_dir.iterdir())
    for subrepo_dir in filter(lambda p: not (p.name in SUBREPO_DEFAULT_EXCLUDE), subdirs):
        all_repo_info[subrepo_dir.name] = {}
        all_repo_info[subrepo_dir.name]["direct_match"] = {}
        all_repo_info[subrepo_dir.name]["regex"] = {}
        all_repo_info[subrepo_dir.name]["mapto"] = {}
        
        for impl_path in filter(lambda p: p.suffix == '.js', subrepo_dir.iterdir()):
            with open(impl_path, encoding='utf-8') as fp:
                flines = fp.readlines()
            
            impl_metadata = read_metadata(flines)
            impl_name = impl_path.stem
            impl_match = impl_metadata["match"]
            impl_mapto = impl_metadata["mapto"]
            
            is_dmatch = impl_name in regex_unescape(impl_match)
            impl_dmatch = "direct_match" if is_dmatch else "regex"
            
            all_repo_info[subrepo_dir.name][impl_dmatch][impl_name] = impl_match
            if impl_mapto: all_repo_info[subrepo_dir.name]["mapto"][impl_name] = impl_mapto
    
    return all_repo_info


repo_path = Path(sys.argv[1])

all_repo_info = collect_repo_info(repo_path)
with open(repo_path / 'repo.json', 'r') as orig_repo_info_fp:
    orig_repo_info = json.load(orig_repo_info_fp)
info_diff = list(diff(orig_repo_info, all_repo_info))

diff_json = json.dumps(info_diff, indent=4)
print('Repo info diff as JSON:')
print(diff_json)
cont = input('Proceed? (Y/n) ')
cont = cont.lower() == 'y' or cont.lower() == 'yes'
if cont:
    with open(repo_path / 'repo.json', 'w') as orig_repo_info_fp:
        json.dump(all_repo_info, orig_repo_info_fp, indent=4)
else:
    print('Aborted.')

orig_repo_info_fp.close()