
var velocity : Vector3 = Vector3.zero;
var gravity : float = 5.0;
var moveRight = true;
var jumpSound : AudioClip;
var dieSound : AudioClip;
var soundRate : float = 0.0;
var soundDelay : float = 0.0;
function PlaySound(soundName,soundDelay : float)
{
	if (!audio.isPlaying && Time.time > soundRate)
	{
		soundRate = Time.time + soundDelay;
		audio.clip = soundName;
		audio.Play();
	}
}

function Update()
{
	var aniPlay = GetComponent("aniSprite");
	var controller : CharacterController = 
	GetComponent(CharacterController);

	velocity.x = Input.GetAxis("Horizontal") * 3;
		
	if (controller.isGrounded)
	{
		if (velocity.x > 0)
		{
			moveRight = true;
		}
		else if (velocity.x < 0)
		{
			moveRight = false;
		}
		
		if (Input.GetKey("space"))
		{
			PlaySound(jumpSound,0);
			velocity.y = 12;
		}		
		else
		{
			if (Input.GetKey("right"))
			{
				aniPlay.aniSprite(8,8,0,1,8,10,false);   //walk face right
			}
			else if (Input.GetKey("left"))
			{
				aniPlay.aniSprite(8,8,0,1,8,10,true);   //walk face left
			}
			else if (Input.GetKey("down"))
			{
				if (moveRight)
				{
					aniPlay.aniSprite(8,8,0,1,8,10,false);    //crouch face right		
				}	
				else
				{
					aniPlay.aniSprite(3,9,0,6,3,24,false);   //crouch face left	
				}
			}		
			else
			{
				if (moveRight)
				{
					aniPlay.aniSprite(8,8,0,0,8,10,false);   //neutral face right		
				}
				else
				{
					aniPlay.aniSprite(8,8,0,0,8,10,true);  //neutral face left	
				}	
			}
		 }
	}
	else
	{
		if (velocity.y >0)
		{
			if (moveRight)
			{
				aniPlay.aniSprite(8,8,0,2,1,10,false);   //jump face right
			}
			else
			{
				aniPlay.aniSprite(8,8,7,2,1,10,true);   //jump face left
			}
		}
		else
		{
			if (moveRight)
			{
				aniPlay.aniSprite(8,8,1,2,1,10,false);   //fall face right
			}
			else
			{
				aniPlay.aniSprite(8,8,6,2,1,10,true);   //fall face left
			}
		}
	}

	velocity.y -= gravity * Time.deltaTime;
	controller.Move(velocity * Time.deltaTime);
}

function resetGame()
{
	PlaySound(dieSound,0);
	yield WaitForSeconds (audio.clip.length);
	Application.LoadLevel('splash');
}