#pragma strict

var charged : boolean = false;
var chargedMat : Material;
function Start () {

}

function Update () {
	
	if(!(Time.time % 3))
		charged = true;
	else
		charged = false;
	
//	if(charged)
//		renderer.material = chargedMat;
}