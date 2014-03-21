from PIL import Image
from glob import iglob
import os.path
import os
import json

ul = (11, 33)
size = (528, 528)
	
tiles = {(0x41, 0x41, 0x41) : " ",
		 (0x8c, 0x8c, 0x8c) : "#",
		 (0, 0, 0) : "_",
		 (0x17, 0x17, 0x17) : "$",
		 (0x62, 0x4c, 0x06) : "@",
		 (0x75, 0x6b, 0x75) : ".",
		 (0xa7, 0xa3, 0x7c) : "*"}
		 
levels = []

bonusOutput = False


if bonusOutput:
	try:
		os.mkdir('proclevels')
	except OSError:
		if not os.path.isdir(path):
			raise

levelnum = 0
for filename in iglob("rndlevels/*.png"):
	levelnum += 1
	im = Image.open(filename)
	im2 = im.crop((ul[0], ul[1], ul[0]+size[0], ul[1]+size[1]))
	
	if bonusOutput:
		filename2 = 'proclevels/%d.png' % levelnum
		im2.save(filename2)
	
	im = Image.new('RGB', (size[0]//16, size[1]//16))
	newdat = []
	for j in range(0, size[1], 16):
		for i in range(0, size[0], 16):
			chunk = im2.crop((i,j,i+16,j+16))
			chunk = chunk.getdata()
			r,g,b = 0,0,0
			for pixel in chunk:
				r += pixel[0]
				g += pixel[1]
				b += pixel[2]
			r = round(r/256)
			g = round(g/256)
			b = round(b/256)
			newdat += [(r,g,b)]
	im.putdata(newdat)
	
	if bonusOutput:
		filename3 = 'proclevels/%da.png' % levelnum
		im.save(filename3)
	
	for i in range(0, size[0]//16):
		if newdat[i][0] == 0x43:
			w = i
			break
	for j in range(0, size[1]//16):
		if newdat[j*(size[0]//16)][0] == 0x48:
			h = j
			break
			
	im = im.crop((1, 1, w, h))
	
	if bonusOutput:
		filename4 = 'proclevels/%db.png' % levelnum
		im.save(filename4)
	

			 
	cropdat = im.getdata()
	textdat = []
	for j in range(0, h-1):
		textdat += [""]
		for i in range(0, w-1):
			textdat[-1] += tiles[cropdat[i+j*(w-1)]]
	
	if bonusOutput:
		filename5 = ('proclevels/%dc.txt' % levelnum)
		fp = open(filename5, 'w')
		fp.write(repr(textdat))
		fp.close()
	
	levels += [{"title" : "Level %d" % levelnum, "data" : textdat}]
	
levelfile = {"levelset" : {"title" : "Original Sokoban Levels"}, "levels" : levels}
fp = open('sokolevels.json', 'w')
json.dump(levelfile, fp)
fp.close()