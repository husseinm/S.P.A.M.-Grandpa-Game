#pragma strict

private var key = 0.0f;
private var startTime = 0.0f;
private var firstGen = true;
private var startColor;
private var endColor;


function Start() {
	startTime = Time.time;
	ChangeColors();
}

function ChangeColors() {
	if (firstGen) {
		startColor = Color(Random.Range(0.0, 1.0),
						   Random.Range(0.0, 1.0),
						   Random.Range(0.0, 1.0));
		firstGen = false;
	} else {
		startColor = endColor;
	}
	
	endColor = Color(Random.Range(0.0, 1.0),
					 Random.Range(0.0, 1.0),
					 Random.Range(0.0, 1.0));
}

function OnGUI() {
	key = Time.time - startTime;
	
	if (key > 1.0) {
		ChangeColors();
		startTime = Time.time;
	}

	gameObject.guiText.material.color = Color.Lerp(startColor, endColor, key);
}