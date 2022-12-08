# [Manga Loader with more features]()

## What is an MLEP  
`EP` is abbreviation of `Enhance Proposal`.  
There are `PEP`(Python EP), `CEP`(Cython EP), `NEP`(NumPy EP)...  
So here is Manga Loader Enhance Proposal, `MLEP`. ;)  
In my opinion, an `EP` is more of a concept than a specific implementation.  
  
## MLEP: Implementation Repository System  
### Why Implementation Repository System  
Currently, Manga Loader puts all implementations inside itself.  
This means that browser have to load ALL implementations EVERY time.  
Also, when someone adds a new implementation or fixes an existing implementation, they have to commit to the whole manga loader script.  

### Main part of Implementation Repository System  
#### Server  
An Implementation Repository should have:  
- a plain text file indicating its version (version file)  
- a `json` file containing subrepo name and URL regex of every implementation (information file)  
- directories containing implementation `js` files (subrepos)  
#### Client  
When loading implementations, manga loader does following things:  
- fetch version file from repository and update information file if local version is outdated  
- test every URL regex on window URL and find out which implementation to use  
- fetch and save implementation `js` file from repo if it is not available locally and eval the implementation  

### Direct match (optional)  
If name of an implementation is a substring of its URL regex, then it is a "direct match".  
When looking for appropriate implementation, for direct matches, only subtring search (`name in pageUrl`) is performed.  
This is because regex matching is a heavy operation and should be avoided to save time. However, for small repos, support for this can be dropped by marking every implementation as regex match.  

### Map to existing implementation (optional)  
There are situations that multiple sites can use the same implementation, and this action used to be done by making the regex of an implementation match all the target sites.  
However, this can make git diff messer when a site in such group is added or deleted, so here is "map to existing implementation".  
It is handled in information file.  
Note: User Override should be prior to mapping. For example, when `A` is mapped to `B` and a User Override of `A` exists, Manga Loader should read User Override of `A`.  
Suggestions on mapping:  
- When there are multiple sites based on the same template and evidence indicates the other sites are copying from one site, map copying sites to copied site.  
- When there are multiple sites based on the same template and the template is public, create a separate file for the template and map all sites to implementation for the template. (For example, `foolslide`.)  
- When multiple sites turns out to be mirrors of the same site, do not use mapping and just update regex for the main site.   
- When nothing is known or it is hard to decide, map the site that is added later to earlier ones.  

### Subrepos and NSFW control  
Just put NSFW implementations in a separate subrepo and make normal version give up searching implementations from it.  

### User Override  
The measures above comes with trouble in implementation developing and debugging: you have to modify remote files to test changes. Thus, "User Override" is introduced.  
When loading an implementation of a certain name, Manga Loader will try to load User Override instead of script from repository. Note that User Override is just a "mask", the repo scripts are still updated as usual.  

### Migrating from original code
Can be done with scripts. See `utils/parse_impls.py`.  