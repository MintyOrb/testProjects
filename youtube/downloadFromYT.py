import pafy

with open('urls.txt') as urls:
    file_lines = urls.readlines()
    total = len(list(file_lines))
    current = 0
    failed = 0
    otherErr = 0
    print total
    for line in file_lines:
        try:
            video = pafy.new(line.strip())
            # print video.title, video.viewcount, video.author, video.length
            # print(video.description)
            best = video.getbest()
            print video.title
            print line
            current+=1
            print current, " of ", total
            title = "".join([c for c in video.title if c.isalpha() or c.isdigit() or c==' ']).rstrip()
            best.download(filepath="videos/"+ title + "." + best.extension)
        except UnicodeEncodeError:
            failed += 1
            with open('failed.txt', 'a') as file:
                file.write(line)
        except:
            otherErr += 1
            with open('error.txt', 'a') as file:
                file.write(sys.exc_info()[0] + " " + url)
    print "finished:"
    print "Failed: ",
    print "Other Errors: ",

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

# print(v.title)
# print(v.duration)
# print(v.rating)
# print(v.author)
# print(v.length)
# print(v.keywords)
# print(v.thumb)
# print(v.videoid)
# print(v.viewcount)
