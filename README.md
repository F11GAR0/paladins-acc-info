# paladins acc info
 Obtains some info about all players in file nicknames.txt
# usage
Install NodeJS from: https://nodejs.org/en/download/
 1. Place all nicknames into file 'nicknames.txt' line by line
 #  on windows
 2. run 'launch.bat'
 #  on linux
 2. run 'launch.sh'
 # at the end
 As result ull get 'parsed.txt' with info about each account.
 
 # Example
 We'll take this nicknames:
 Vizol
 FullmetalJosh
 Alkpфte
 nordac94
 Parabellum00
 SirBromhall
 
 And after executing script we'll get this:
 {nickname:'Parabellum00',playtime:509,seen:'2020-03-25T15:29:39.199Z',level:14}
 {nickname:'SirBromhall',playtime:19398,seen:'2020-05-13T03:12:25.169Z',level:105}
 {nickname:'Vizol',playtime:7749,seen:'2020-06-07T22:20:03.062Z',level:64}
 {nickname:'FullmetalJosh',playtime:1347,seen:'2019-06-11T14:57:36.504Z',level:34}
 
 If account does not exist, it will not added in end file.
