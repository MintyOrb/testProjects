from os import walk

files = []
for (dirpath, dirnames, filenames) in walk('./'):
    files.extend(filenames)
    break

html_head = """
<!DOCTYPE html>
<html>
<head>
    <title>D3 Playground</title>
    <!-- Compiled and minified CSS -->
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/css/materialize.css">
</head>
<body>
<div style="display:flex; flex-flow: row wrap;align-content:space-between;align-items:stretch;justify-content:center">
"""

html_middle = ""

html_end = """
</div>
</body>
</html>
"""

for file in files:

    print (file)
    if file.endswith('.html'):
        html_middle += "<a style='padding:30px;width:250px;text-align:center;border-radius:20px' class='hoverable' href='/" + file + "'>" + file[:-5] + "</a>"

html_final = html_head + html_middle + html_end

Html_file= open("index.html","w")
Html_file.write(html_final)
Html_file.close()
