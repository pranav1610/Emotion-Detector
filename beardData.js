function loadFile(event)
{
    var image = document.getElementById("output");
    image.src = URL.createObjectURL(event.target.files[0]);
}

async function handle(event)
{
    console.log("Submitting Face...");

    //Informs the user that the photo uploaded is being processed
    $("#emotion").html("Loading...");
    
    //Prevents auto-submission - prevents uploading without being processed
    event.preventDefault();

    //receive the input from the form in front-end
    var myFormContents = document.getElementById("image-form");

    //convert the form input to data to use
    var formContentToData = new FormData(myFormContents);

    //response analysis by Face API on image(formContentToData) that is POST[ed] 
    const resp = await fetch("https://pranavpatel.azurewebsites.net/api/pranav_codess?code=ffiAnngeJuRgZmylvWpkLtnICvix3ZY7H6TDlBxShbu622b1rj5inw==",{
        method: 'POST',
        body: formContentToData
    });
    
    //convert response analysis to json to print later!
    var data = await resp.json();

    //receive the emotion attributes from the Face API data received above
    var emotionData = data.result[0].faceAttributes.emotion;

    //to check if this code makes a request to the Azure Function
    console.log(emotionData);


    //convert the emotionData to printable string!
    var resultString = `
    <h3>Your Emotions:</h3>
    <p>anger: ${emotionData.anger}</p>
    <p>contempt: ${emotionData.contempt}</p>
    <p>disgust: ${emotionData.disgust}</p>
    <p>fear: ${emotionData.fear}</p>
    <p>happiness: ${emotionData.happiness}</p>
    <p>neutral: ${emotionData.neutral}</p>
    <p>sadness: ${emotionData.sadness}</p>
    <p>surprise: ${emotionData.surprise}</p>
    `
    //jQuery to display to above string in html!!!
    $("#emotion").html(resultString);

}
