import { displayResults } from "../src/client/js/displayResults"; 

describe('displayResults function', () => {

  let resultsDiv;

  beforeEach(() => {
    resultsDiv = document.createElement('div');
    resultsDiv.id = 'results';
    document.body.appendChild(resultsDiv);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should display correct result for neutral sentiment', () => {
    const data = {
      sentiment: 'NEUTRAL',
      sentiment_scores: { Positive: 0.1, Negative: 0.1, Neutral: 0.8, Mixed: 0.0 },
      text: 'This is neutral text.'
    };

    displayResults(data);

    const content = resultsDiv.innerHTML;
    
    expect(content).toContain('<strong>Sentiment:</strong> NEUTRAL');
    expect(content).toContain('<strong>Content Type:</strong> Objective');
    expect(content).toContain('<strong>Overall Sentiment:</strong> Neutral');
    expect(content).toContain('<strong>Positive Score:</strong> 0.10');
    expect(content).toContain('<strong>Negative Score:</strong> 0.10');
    expect(content).toContain('<strong>Neutral Score:</strong> 0.80');
    expect(content).toContain('<strong>Mixed Score:</strong> 0.00');
    expect(content).toContain('"This is neutral text."');
  });

  test('should display correct result for positive sentiment', () => {
    const data = {
      sentiment: 'POSITIVE',
      sentiment_scores: { Positive: 0.9, Negative: 0.05, Neutral: 0.03, Mixed: 0.02 },
      text: 'This is a positive text.'
    };

    displayResults(data);

    const content = resultsDiv.innerHTML;
    
    expect(content).toContain('<strong>Sentiment:</strong> POSITIVE');
    expect(content).toContain('<strong>Content Type:</strong> Subjective');
    expect(content).toContain('<strong>Overall Sentiment:</strong> Positive');
    expect(content).toContain('<strong>Positive Score:</strong> 0.90');
    expect(content).toContain('<strong>Negative Score:</strong> 0.05');
    expect(content).toContain('<strong>Neutral Score:</strong> 0.03');
    expect(content).toContain('<strong>Mixed Score:</strong> 0.02');
    expect(content).toContain('"This is a positive text."');
  });

  test('should display correct result for negative sentiment', () => {
    const data = {
      sentiment: 'NEGATIVE',
      sentiment_scores: { Positive: 0.02, Negative: 0.85, Neutral: 0.1, Mixed: 0.03 },
      text: 'This is a negative text.'
    };

    displayResults(data);

    const content = resultsDiv.innerHTML;
    
    expect(content).toContain('<strong>Sentiment:</strong> NEGATIVE');
    expect(content).toContain('<strong>Content Type:</strong> Subjective');
    expect(content).toContain('<strong>Overall Sentiment:</strong> Negative');
    expect(content).toContain('<strong>Positive Score:</strong> 0.02');
    expect(content).toContain('<strong>Negative Score:</strong> 0.85');
    expect(content).toContain('<strong>Neutral Score:</strong> 0.10');
    expect(content).toContain('<strong>Mixed Score:</strong> 0.03');
    expect(content).toContain('"This is a negative text."');
  });

  test('should display correct result for mixed sentiment', () => {
    const data = {
      sentiment: 'MIXED',
      sentiment_scores: { Positive: 0.3, Negative: 0.4, Neutral: 0.2, Mixed: 0.1 },
      text: 'This is a mixed text.'
    };

    displayResults(data);

    const content = resultsDiv.innerHTML;
    
    expect(content).toContain('<strong>Sentiment:</strong> MIXED');
    expect(content).toContain('<strong>Content Type:</strong> Subjective');
    expect(content).toContain('<strong>Overall Sentiment:</strong> Negative');
    expect(content).toContain('<strong>Positive Score:</strong> 0.30');
    expect(content).toContain('<strong>Negative Score:</strong> 0.40');
    expect(content).toContain('<strong>Neutral Score:</strong> 0.20');
    expect(content).toContain('<strong>Mixed Score:</strong> 0.10');
    expect(content).toContain('"This is a mixed text."');
  });

});
