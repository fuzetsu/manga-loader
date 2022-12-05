import sys
import json
from pathlib import Path

impl_path = Path(sys.argv[1])
out_dir = Path(sys.argv[2])
repo_subdir = out_dir.name
with open(impl_path, 'r', encoding='utf-8') as impl_fp:
    impl_text = impl_fp.read()

def find_range(astr):
    srange = []
    for i, c in enumerate(astr):
        if c == '{':
            srange.append(i)
            break
    for i, c in enumerate(reversed(astr)):
        if c == '}':
            srange.append(len(astr)-i)
            break
    return tuple(srange)

def parse_into_sections(astr, str_range):
    nested = 0
    escape = False
    sec_range = []
    for i, c in enumerate(astr):
        if i < str_range[0] or i >= str_range[1]:
            continue

        if escape: escape = False; continue
        if c == '\\':
            escape == True
            continue
        if c == '{':
            if nested == 0:
                sec_range.append(i)
            nested += 1
            continue
        if c == '}':
            nested -= 1
            if nested == 0:
                sec_range.append(i+1)
                yield astr[sec_range[0]:sec_range[1]]
                sec_range = []
            continue

def parse_section_items(astr):
    nested = 0
    instr = False
    astr = astr[1:-1]
    last_item_idx = 0
    astrlen = len(astr)
    for i, c in enumerate(astr):
        if c in '"\'':
            instr = not instr
            continue
        if c in '{[(':
            nested += 1
            continue
        if c in '}])':
            nested -= 1
            continue
        if c == ',':
            if nested == 0 and not instr:
                yield astr[last_item_idx:i].strip()
                last_item_idx = i+1
            continue
        if i == astrlen-1:
            yield astr[last_item_idx:].strip()
            continue

parsed_impl = ( ( item.split(':', maxsplit=1) for item in parse_section_items(sec_text) ) for sec_text in parse_into_sections(impl_text, find_range(impl_text)) )

repo_info = {
    'direct_match': {},
    'regex': {}
}

for section in parsed_impl:
    item_info = {}
    item_texts = []
    for item in section:
        if item[0] in ('name', 'match'):
            item_info[item[0]] = item[1].strip()[1:-1]
        else:
            item_texts.append(':'.join(item))
    
    direct_match = item_info['name'] in item_info['match']
    URLregex = 'false' if direct_match else 'true'
    item_texts.append('URLregex: %s' % URLregex)
    
    if direct_match:
        repo_info['direct_match'][item_info['name']] = item_info['match']
    else:
        repo_info['regex'][item_info['name']] = item_info['match']

    item_info['code'] = 'var impl_src = {\n  %s\n}' % ',\n  '.join(item_texts)
    out_name = '%s.js' % item_info['name']
    with open(out_dir/out_name, 'w', encoding='utf-8') as out_fp:
        out_fp.write('// METADATA\n')
        out_fp.write('// name: %s\n' % item_info['name'])
        out_fp.write('// match: %s\n' % item_info['match'])
        out_fp.write('\n')
        out_fp.write(item_info['code'])

print(json.dumps(repo_info).replace(r'\\\\', r'\\'))