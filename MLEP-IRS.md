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

### Direct match  
If name of an implementation is a substring of its URL regex, then it is a "direct match".  
When looking for appropriate implementation, for direct matches, only subtring search (`name in pageUrl`) is performed.  

### Subrepos and NSFW control  
Just put NSFW implementations in a separate subrepo and make normal version give up searching implementations from it.  

### User Override  
The measures above comes with trouble in implementation developing and debugging: you have to modify remote files to test changes. Thus, "User Override" is introduced.  
When loading an implementation of a certain name, Manga Loader will try to load User Override instead of script from repository. Note that User Override is just a "mask", the repo scripts are still updated as usual.  

### Migrating from original code
Can be done with scripts. See `utils/parse_impls.py`.  