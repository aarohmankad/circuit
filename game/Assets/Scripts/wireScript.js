#pragma strict

var charged : boolean = false;
var chip  : GameObject;
function Start () {

}

function Update () {
	
	charged = chip.GetComponent(chipScript).charged;
	
	if(charged)
	{
		GetComponent(aniSprite).aniSprite(1,2,0,0,2,15, false);
		transform.collider.isTrigger = true;
	}
	else
	{
		GetComponent(aniSprite).aniSprite(1,2,0,0,1,25, false);
		transform.collider.isTrigger = false;
	}
}