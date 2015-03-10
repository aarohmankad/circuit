#pragma strict

//private enum Direction {up, down, left, right, off};
var intendedDir : Direction;
var clock : GameObject;
var charged : boolean = false;
function Start () {

}

function Update () {

	if(clock.GetComponent(timer).getTimerDir() == intendedDir)
		charged = true;
	else
		charged = false;
		
	if(charged)
	{
		GetComponent(aniSprite).aniSprite(1,2,0,0,2,25, false);
		transform.collider.isTrigger = true;
	}
	else
	{
		GetComponent(aniSprite).aniSprite(1,2,0,0,1,25, false);
		transform.collider.isTrigger = false;
	}
}