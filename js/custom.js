/*!
 * ddcollision - jQuery Plugin
 * version: 1.0.0 (November 2022)
 * @requires jQuery
 *
 * Examples at /
 *
 * Developed By Joby AJ 
 *
 */
var jddcObj = {
    resize:false, //resize property , dafault value false /// boolean value
    parent:'j-ddc-wrap', // parent selector , dafault value j-ddc-wrap
    selector:'j-ddc-ele', // drag element , dafault value j-ddc-ele
    overlapClass:'j-ddc-overlap', // overlap identifier class ,  dafault j-ddc-overlap
    collisionClass:'j-ddc-collision', // collision identifier class ,  dafault j-ddc-collision
    minSize:10, // min size of block related to resizing ,  dafault 10
    ruler:true // ruler for drag blocks ,  dafault is false /// boolean value

}

$(function () {
    jddc.init(jddcObj);
});
