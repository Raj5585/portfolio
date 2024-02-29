import musicgneration from '../assets/svg/projects/musicgeneration.png'
import quicknews from '../assets/svg/projects/quicknews.png'
import vton from '../assets/svg/projects/vton.jpg'
import senti from '../assets/svg/projects/senti.jpg'
import covid from '../assets/svg/projects/covid.png'
import openup from '../assets/svg/projects/openup.png'


export const projectsData = [
    {
        id: 1,
        projectName: 'Virtual Try On',
        projectDesc: 'Virtual Try On is a versatile fashion platform allowing users to virtually try on various clothes. Developed using Flutter for the mobile app and Django for the web app, it provides an open and interactive fashion experience.',
        tags: ['Flutter', '3D model', 'DeepLearning'],
        code: '',
        demo: '',
        image: vton
    },
    {
        id: 2,
        projectName: 'Covi-shield',
        projectDesc: `Covi-shield, a C++ application, supports COVID-infected patients with patient management, a health-oriented chatbot,
                    and emergency hospital guidance via Google Maps.
                    The inclusion of an entertaining shooter game enhances its potential as a valuable tool for patient support. `,
        tags: ['SMFL ', 'C++'],
        code: '',
        demo: 'https://github.com/Raj5585/covi-shield.git',
        image: covid
    },
    {
        id: 3,
        projectName: 'OpenUp',
        projectDesc: `OpenUp, a mental health app using JavaScript and Django, enables anonymous expression of feelings for individuals dealing with mental health issues. It creates a judgment-free space for users to share struggles. Premium features offer online therapy for added convenience..`,
        tags: ['Javascript', 'DJANGO', 'Sqlite'],
        code: '',
        demo: 'https://github.com/Raj5585/OpenUp.git',
        image: openup
    },
    {
        id: 4,
        projectName: 'Music Generation Using LSTM',
        projectDesc: `The LSTM-based model creates unique melodies in seven Western music modes, targeting musicians and producers for creative inspiration. The project underscores AI's potential in music composition, highlighting advancements in the field through RNN and machine learning..`,
        tags: ['LSTM', 'NLP', 'Django'],
        code: ' ,',
        demo: 'https://github.com/orgs/Music-Generation-with-Transformers/repositories',
        image: musicgneration
    },
    {
        id: 5,
        projectName: 'QuickNews',
        projectDesc: 'QuickNews is an automated software that scrapes recent news from top Nepali news media based on given keywords. It then sends these news articles via email to subscribed receivers.',
        tags: ['selenium', 'QuickRPA', 'Postgres'],
        code: '',
        demo: 'https://github.com/Raj5585/QuickNews-Bot.git',
        image: quicknews
    },
    {
        id: 6,
        projectName: 'Sentiment Analysis on Nepali sentence using BERT model',
        projectDesc: `Using a fine-tuned BERT model, the Nepali Sentiment Analysis categorizes text into three labels (negative, positive, and neutral). Hosted on Flask, it provides real-time insights for market research, brand management, and customer service from Nepali text sentiment.`,
        tags: ['NepaBert', 'SVM', 'NLP'],
        code: '',
        demo: 'https://github.com/FuseMachines-DL-proj/Sentiment-Analysis-on-Nepali-Sentences-Using-Bert-Models',
        image: senti
    },
]


// Do not remove any fields.
// Leave it blank instead as shown below

/* 
{
    id: 1,
    projectName: 'Car Pooling System',
    projectDesc: '',
    tags: ['Flutter', 'React'],
    code: '',
    demo: '',
    image: ''
}, 
*/