export function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    const contentType = (data.sentiment === 'NEUTRAL') ? 'Objective' : 'Subjective';
    const { Positive, Negative, Neutral, Mixed } = data.sentiment_scores;
    // Find the highest sentiment score
    const maxScore = Math.max(Positive, Negative, Neutral, Mixed);
    let dominantSentiment = "Neutral"; 

    if (maxScore === Positive) {
        dominantSentiment = "Positive";
    } else if (maxScore === Negative) {
        dominantSentiment = "Negative";
    } else if (maxScore === Mixed) {
        dominantSentiment = "Mixed";
    }
    resultsDiv.innerHTML = `<br>
        <strong>Sentiment:</strong> ${data.sentiment || 'Not available'}. <br><br>
        
        <strong>Content Type:</strong> ${contentType}. <br><br>

        <strong>Overall Sentiment:</strong> ${dominantSentiment}. <br>
        <strong>Positive Score:</strong> ${Positive.toFixed(2)}.<br>
        <strong>Negative Score:</strong> ${Negative.toFixed(2)}.<br>
        <strong>Neutral Score:</strong> ${Neutral.toFixed(2)}.<br>
        <strong>Mixed Score:</strong> ${Mixed.toFixed(2)}.<br><br>

        <strong>Analyzed Text:</strong> "${data.text || 'No text available'}".
    `;
}

