from PIL import Image
from glob import iglob
from os.path import split, splitext

for filename in iglob("src/*.bmp"):
	filename2 = splitext(split(filename)[-1])[0]+'.png'
	im = Image.open(filename)
	im2 = Image.new("RGBA", im.size)
	dat = im.getdata()
	dat2 = [(0, 0, 0, 0)] * len(dat)
	for i in range(len(dat)):
		if dat[i] not in ((0, 88, 105),(141, 181, 0)):
			dat2[i] = dat[i] + (255,)
	im2.putdata(dat2)
	im2.save(filename2)
	