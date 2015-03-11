#pragma strict

var charged : boolean = false;

function Start () {

}

function Update () {
	
	
	if(Time.time % 3 <= 1)
		charged = true;
	else
		charged = false;
	
	if(charged)
		GetComponent(aniSprite).aniSprite(1,2,0,1,1,25, false);
	else
		GetComponent(aniSprite).aniSprite(1,2,0,0,1,25, false);
}