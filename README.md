What is this?
=============

This is completely focused for the drag and drop function and you can set the block to resize. Here is you can find the multiple blocks collision and overlaps, some options are here to handle the block


Installation
---

Simply add the css and js files, Do not forget to add the jQuery file. And no any frameworks required. you can find the uncompressed files, and also do to manipulate all the codes with your needs.

```
<link rel="stylesheet" href="css/jquery-ui.min.css">
<link rel="stylesheet" href="css/j-ddcollision.min.css">

<script src="js/jquery-ui.min.js"></script>
<script src="js/j-ddcollision.js"></script>
```


Supporting features
---

- block level draging
- multiple blocks can drag and drop
- blocks collision and overlaping
- resize property
- collistion and overlap class customization
- rulers



Initialize the Drag and Drop Collision
---

```
var jddcObj = {
    resize:true, //resize property , dafault value false /// boolean value
    parent:'j-ddc-wrap', // parent selector , dafault value j-ddc-wrap
    selector:'j-ddc-ele', // drag element , dafault value j-ddc-ele
    overlapClass:'j-ddc-overlap', // overlap identifier class ,  dafault j-ddc-overlap
    collisionClass:'j-ddc-collision', // collision identifier class ,  dafault j-ddc-collision
    minSize:10, // min size of block related to resizing ,  dafault 10
    ruler:true // ruler for drag blocks ,  dafault is false /// boolean value
}

jddc.init(jddcObj);

```

checkout the demo on codepen [j-ddcollision](https://codepen.io/JobyJoDiyon/pen/oNyMarb).

[check live demo here](https://jobyaj.github.io/j-ddcollision/)
