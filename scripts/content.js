const API_KEY = 'A0wlVXDWNOupjZRleoZD9pRdP';
const API_KEY_SECRET = 'j6XVDKpKhW4SFTWgqfJAi4IRLZQ4M97sSMQR2vgtrcx0YdiHgD';
const BEARER_TOKEN =
  'AAAAAAAAAAAAAAAAAAAAAIISkwEAAAAAFknAn8JAnGJ3rEiCjN2P0AjRgTg%3DvG10QutMIJ2Rv5rzxGccGGXbIctwhU9BaQS56YUA2XLB5CcuiS';

// Pause for 2 seconds
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const updateRatio = async () => {
  // Get the Tweet ID of the current page
  const tweetID = window.location.pathname.split('/')[3];
  console.log('tweetID', tweetID);

  const response = await fetch(
    `https://api.twitter.com/2/tweets/${tweetID}?tweet.fields=public_metrics`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  );

  const tweet = await response.json();
  console.log(JSON.stringify(tweet));

  const numLikes = tweet.data.public_metrics.like_count;
  const numViews = tweet.data.public_metrics.impression_count;
  console.log(`Tweet ${tweetID} has ${numLikes} likes and ${numViews} views.`);

  await wait(2000);

  const elements = document.querySelectorAll(
    '.css-901oao.css-16my406.r-poiln3.r-bcqeeo.r-qvutc0'
  );

  const elementWithViewsIndex = Array.from(elements).findIndex((element) =>
    element.textContent.includes('Views')
  );

  const elementWithLikesIndex = Array.from(elements).findIndex((element) =>
    element.textContent.includes('Likes')
  );

  const ratio = numLikes / numViews;
  console.log(`The ratio of likes to views is ${ratio}. Ratio lil bro 😂`);

  const infoBar = document.querySelectorAll(
    '.css-1dbjc4n.r-2sztyj.r-1efd50x.r-5kkj8d.r-13awgt0.r-18u37iz.r-tzz3ar.r-s1qlax.r-1yzf0co'
  )[0];

  const viewsElement = infoBar.children[0];
  const ratioElement = viewsElement.cloneNode(true);

  const ratioElements = ratioElement.getElementsByClassName(
    'css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0'
  );
  const [value, units] = Array.from(ratioElements).filter(
    (element) =>
      element.className === 'css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0'
  );

  // Make ratio a percentage, remove leading zeros, then trailing zeros from ratio, if any, and add a percent sign
  value.textContent = `${(ratio * 100).toFixed(2).replace(/\.?0+$/, '')}%`;
  units.textContent = '❤️/👀';

  infoBar.children[infoBar.children.length - 1].classList.add('r-1mf7evn');
  infoBar.appendChild(ratioElement);
};

updateRatio();
