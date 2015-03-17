
var velocity : Vector3 = Vector3.zero;
var gravity : float = 5.0;
var moveRight = true;
var jumpSound : AudioClip;
var dieSound : AudioClip;
var soundRate : float = 0.0;
var soundDelay : float = 0.0;
var forceCrawl : boolean = false;
var gameOver : boolean = false;

private var prevYPos;
private var move = .001;
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
	
	if (!gameOver)
	{
		if((Input.GetKey(KeyCode.S) || Input.GetKey('down') || forceCrawl) && controller.isGrounded)
		{
			velocity.x = Input.GetAxis("Horizontal") * 2;
			controller.height = 0.35;
			controller.center.y = -0.35;
		}
		else
		{
			velocity.x = Input.GetAxis("Horizontal") * 3;
			controller.height = 0.8;
			controller.center.y = -0.15;
		}
		
		if (velocity.x > 0)
		{
			moveRight = true;
		}
		else if (velocity.x < 0)
		{
			moveRight = false;
		}
			
		if (controller.isGrounded)
		{
			velocity.y = 0;
			if (velocity.x > 0)
			{
				moveRight = true;
			}
			else if (velocity.x < 0)
			{
				moveRight = false;
			}
			if (Input.GetKey("space") && !(Input.GetKey(KeyCode.S) || Input.GetKey('down') || forceCrawl))
			{
				PlaySound(jumpSound,0);
				velocity.y = 12;
			}		
			else
			{
				if (Input.GetKey("right") || Input.GetKey(KeyCode.D))
				{
					aniPlay.aniSprite(8,8,0,1,8,10,false);   //walk face right
				}
				else if (Input.GetKey("left") || Input.GetKey(KeyCode.A))
				{
					aniPlay.aniSprite(8,8,0,1,8,10,true);   //walk face left
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
				
				if (Input.GetKey("down") || Input.GetKey(KeyCode.S) || forceCrawl)
				{
					if (moveRight)
					{
						aniPlay.aniSprite(8,8,0,3,4,5,false);    //crouch face right		
					}	
					else
					{
						aniPlay.aniSprite(8,8,4,3,4,5,true);   //crouch face left	
					}
					
					if(Input.GetKey('right') || Input.GetKey(KeyCode.D))
						aniPlay.aniSprite(8,8,0,4,8,10,false);  //crawl face right
					else if(Input.GetKey('left') || Input.GetKey(KeyCode.A))
						aniPlay.aniSprite(8,8,0,4,8,10,true);  //crawl face left
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
		
		velocity.x += move;
		move = -move;
		controller.Move(velocity * Time.deltaTime);
	
	if(prevYPos != transform.position.y)
		prevYPos = transform.position.y;
	else
		velocity.y = 0;
	}
	else
	{
		aniPlay.aniSprite(8,8,0,7,8,8,false);   //die face right

	}
}

function OnTriggerEnter(other : Collider)
{
	if(other.tag == 'wire' && other.GetComponent(wireScript).charged)
	{
		gameOver = true;
		die();
	}	
	if(other.tag == 'chip' && other.GetComponent(chipScript).charged)
	{
		gameOver = true;
		die();
	}
	if(other.tag == 'bolt' && other.GetComponent(boltScript).charged)
	{
		gameOver = true;
		die();
	}
	if(other.tag == 'saw')
	{
		gameOver = true;
		die();
	}
	if(other.tag == 'crawlZoneStart')
	{
		forceCrawl = true;
	}
	else if(other.tag == 'crawlZoneEnd')
	{
		forceCrawl = false;
	}
	if(other.tag == 'Finish')
		loadNext();
		
}

function loadNext()
{
	Application.LoadLevel(Application.loadedLevel+1);
}

function die()
{
	yield WaitForSeconds(1);
	Application.LoadLevel(Application.loadedLevel);
}






