# from pytube import YouTube
import pafy
for line in open('urls.txt'):
    video = pafy.new(line.strip())
    # print video.title, video.viewcount, video.author, video.length
    # print(video.description)
    best = video.getbest()
    title = "".join([c for c in video.title if c.isalpha() or c.isdigit() or c==' ']).rstrip()
    best.download(filepath="videos/"+ title + "." + best.extension)

# >>> audiostreams = video.audiostreams
# >>> for a in audiostreams:
# ...     print(a.bitrate, a.extension, a.get_filesize())
# ...
# 256k m4a 331379079
# 192k ogg 172524223
# 128k m4a 166863001
# 128k ogg 108981120
# 48k m4a 62700449
#
# >>> bestaudio = video.getbestaudio()
# >>> bestaudio.bitrate
# '256'
#
# >>> bestaudio.download()
