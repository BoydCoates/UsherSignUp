export const homeDefaults = {
  skipLabel: "Skip to content",
  topChurchName: "UTICA BAPTIST CHURCH",
  topTagline: "Serving our church. Welcoming our community.",
  topWebsiteLabel: "Visit our church website",
  brandName: "UTICA",
  brandSubtitle: "BAPTIST CHURCH",
  brandLogoAlt: "Utica Baptist Church logo",
  navigationLabel: "Main navigation",
  navMinistry: "Our ministry",
  navSpotlight: "Usher of the Month",
  navServe: "Get involved",
  adminStatus: "You’re signed in.",
  adminEditLabel: "Edit home page",
  heroPrimaryLabel: "Find your place to serve",
  heroSecondaryLabel: "Discover the ministry",
  heroFooterLabel: "THE USHER MINISTRY",
  heroFooterTagline: "A little kindness. A lasting difference.",
  ministryEyebrow: "MORE THAN AN OPEN DOOR",
  welcomeNumber: "01 /",
  supportNumber: "02 /",
  spotlightEyebrow: "A HEART WORTH CELEBRATING",
  spotlightPlaceholder: "A face of faithful service",
  spotlightFallbackTitle: "Faithfulness makes a difference.",
  spotlightSignature: "With grateful hearts, your Utica family",
  serveEyebrow: "YOU HAVE A PLACE HERE",
  scheduleLinkTitle: "Already have a schedule link?",
  scheduleLinkDescription: "Open the link shared by your team leader to sign up for that service. Schedule links are shared directly with the team.",
  bannerLinkLabel: "Discover Utica Baptist Church",
  footerChurchName: "UTICA BAPTIST CHURCH",
  footerDescription: "Usher Ministry · Seneca, South Carolina",
  footerAddress: "4056 Wells Highway · Seneca, SC 29678",
  footerAdminLabel: "Admin sign in",
  welcomeTitle: 'Welcome with warmth',
  welcomeDescription: 'A smile and a sincere hello help every person feel they belong.',
  supportTitle: 'Serve with purpose',
  supportDescription: 'Guide, assist, and care for others so they can focus on worship.',
  bannerEyebrow: 'ROOTED IN FAITH. UNITED IN SERVICE.',
  bannerTitle: 'One church family.\nMany hands to serve.',
  thanksTitle: 'Thank you for making room for others.',
  heroEyebrow: 'UTICA BAPTIST CHURCH · SENECA, SOUTH CAROLINA',
  heroTitle: 'A heart to serve.\nA place to belong.',
  heroDescription: 'A friendly face. An open door. A helping hand. Our usher ministry makes room for people to feel welcome and encounter the love of Christ.',
  ministryTitle: 'Small acts of service.\nAn eternal purpose.',
  ministryDescription: 'At Utica Baptist Church, welcoming people is part of caring for people. Our ushers serve together to help every guest and church family member feel at home, from the first hello to the final amen.',
  nextTitle: 'Serving simply starts here.',
  nextDescription: 'New to ushering? Connect with your team leader to learn where to meet, when to arrive, and how you can help. Have a service link already? Open the link your team leader shared to choose your place. No account needed.',
  spotlightLabel: 'USHER OF THE MONTH',
  spotlightMonth: '',
  spotlightName: '',
  spotlightDescription: 'Faithful service often happens in the quiet moments. This space celebrates an usher whose kindness, dependability, and heart for others make a difference in our church family.',
  spotlightPhotoAlt: '',
};
export const homeFieldNames = Object.keys(homeDefaults) as (keyof typeof homeDefaults)[];

export const additionalHomeFields = [
  [
    "skipLabel",
    "Skip-to-content link",
    200
  ],
  [
    "topChurchName",
    "Top bar church name",
    200
  ],
  [
    "topTagline",
    "Top bar tagline",
    200
  ],
  [
    "topWebsiteLabel",
    "Top church website link",
    200
  ],
  [
    "brandName",
    "Header logo title",
    200
  ],
  [
    "brandSubtitle",
    "Header logo subtitle",
    200
  ],
  [
    "brandLogoAlt",
    "Church logo accessible description",
    200
  ],
  [
    "navigationLabel",
    "Navigation accessible label",
    200
  ],
  [
    "navMinistry",
    "Ministry navigation link",
    200
  ],
  [
    "navSpotlight",
    "Featured usher navigation link",
    200
  ],
  [
    "navServe",
    "Get involved navigation link",
    200
  ],
  [
    "adminStatus",
    "Signed-in notice",
    200
  ],
  [
    "adminEditLabel",
    "Home page edit link",
    200
  ],
  [
    "heroPrimaryLabel",
    "Main welcome button",
    200
  ],
  [
    "heroSecondaryLabel",
    "Secondary welcome link",
    200
  ],
  [
    "heroFooterLabel",
    "Welcome section bottom label",
    200
  ],
  [
    "heroFooterTagline",
    "Welcome section bottom tagline",
    200
  ],
  [
    "ministryEyebrow",
    "Ministry section label",
    200
  ],
  [
    "welcomeNumber",
    "First ministry item marker",
    200
  ],
  [
    "supportNumber",
    "Second ministry item marker",
    200
  ],
  [
    "spotlightEyebrow",
    "Featured usher section label",
    200
  ],
  [
    "spotlightPlaceholder",
    "Portrait placeholder caption",
    200
  ],
  [
    "spotlightFallbackTitle",
    "Featured usher heading when no name is set",
    200
  ],
  [
    "spotlightSignature",
    "Featured usher closing signature",
    200
  ],
  [
    "serveEyebrow",
    "Getting involved section label",
    200
  ],
  [
    "scheduleLinkTitle",
    "Schedule link information heading",
    200
  ],
  [
    "scheduleLinkDescription",
    "Schedule link instructions",
    2000
  ],
  [
    "bannerLinkLabel",
    "Closing church website link",
    200
  ],
  [
    "footerChurchName",
    "Footer church name",
    200
  ],
  [
    "footerDescription",
    "Footer ministry description",
    2000
  ],
  [
    "footerAddress",
    "Footer address",
    200
  ],
  [
    "footerAdminLabel",
    "Footer admin sign-in link",
    200
  ]
] as const;
