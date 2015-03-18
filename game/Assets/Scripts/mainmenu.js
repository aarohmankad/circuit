#pragma strict

var style : GUIStyle;
var logo : GUIStyle;
function Start () {

}

function Update () {
}

function OnGUI()
{
	GUI.Button(Rect(150,100,400,100), "Circuit", logo);
	
	if(GUI.Button(Rect(100,250,400,100), "Start", style))
		Application.LoadLevel(Application.loadedLevel+2);
	if(GUI.Button(Rect(100,400,400,100), "Help", style))
		Application.LoadLevel(Application.loadedLevel+1);
	if(GUI.Button(Rect(100,550,400,100), "Quit", style))
		Application.Quit();
}