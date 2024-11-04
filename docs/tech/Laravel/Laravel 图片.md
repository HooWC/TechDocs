---
id: laravel-pic
slug: /laravel-pic
title: 图片使用
date: 2024-11-04
authors: Hoo
tags: [laravel]
keywords: [laravel]
---

## Laravel 图片

```
<input type="file" accept="image/" name="image" id="image" />
```

```
$img = $request->image->getClientOriginalName();
$request->image->move(public_path('images'),$img);
```

打印出来

```
<img src="{{ URL::asset($item->photo->path) }}" />
```

Edit

```
if($request->has('image')){
	$photo = Photos::where('product_id',$items->id)->first();
	File::delete($photo->path)
	
	$img = $request->image->getClientOriginalName();
	$request->image->move(public_path('images'),$img);
	$photos = new Photos();
	$photos->path = 'images/' . $img;
	$photo->product_id = $items->id;
	$photo->save();
}

return back();
```

