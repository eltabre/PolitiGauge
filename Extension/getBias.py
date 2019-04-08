import requests
import justext
import sys

response = requests.get("https://thehill.com/opinion/white-house/436059-alan-dershowitz-how-cnn-misled-its-viewers")
paragraphs = justext.justext(response.content, justext.get_stoplist("English"))
for paragraph in paragraphs:
  if not paragraph.is_boilerplate:
    print (paragraph.text)

url = sys[1]
print (url)



# Return estimated bias
return paragraph.text
