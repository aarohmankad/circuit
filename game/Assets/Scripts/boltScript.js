#pragma strict

var chip : GameObject;
var charged : boolean = false;
function Start () {

}

function Update () {
	
	charged = renderer.enabled = chip.GetComponent(chipScript).charged;
	
	GetComponent(aniSprite).aniSprite(1,4,0,0,4,15, false);
}