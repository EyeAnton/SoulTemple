const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Preparing deployment to Netlify...');

// Create a simple HTML file that can be deployed
const createDeployableHTML = () => {
  const htmlContent = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Храм Души - Духовное путешествие" />
    <title>Храм Души</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            background: #000;
            color: #fff;
            overflow-x: hidden;
        }
        
        .game-container {
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #000;
            padding: 20px;
        }
        
        .game-content {
            width: 800px;
            max-width: 100%;
            height: 100vh;
            background: #fff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            display: flex;
            flex-direction: column;
        }
        
        .background-image {
            width: 100%;
            height: calc(100vh - 200px);
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            position: relative;
            background-color: #f8f9fa;
        }
        
        .scene-title {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            font-size: 1.8rem;
            font-weight: 300;
            color: #fff;
            letter-spacing: 2px;
            margin: 0;
            text-align: center;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
            z-index: 4;
            animation: fadeInDown 0.8s ease-out;
        }
        
        .narrator-section {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 0 40px 20px 40px;
            background: transparent;
            z-index: 2;
        }
        
        .narrator-paragraph {
            font-size: 1.1rem;
            color: #fff;
            font-style: italic;
            background: rgba(0, 0, 0, 0.6);
            padding: 15px 20px;
            border-radius: 10px;
            border-left: 4px solid #667eea;
            margin: 0;
            word-wrap: break-word;
            backdrop-filter: blur(5px);
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
        
        .character-container {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1;
            pointer-events: none;
        }
        
        .character-image {
            max-width: 360px;
            max-height: 450px;
            border-radius: 10px;
            animation: float 3s ease-in-out infinite;
            opacity: 0.9;
        }
        
        .scene-content {
            padding: 0;
            background: #fff;
            text-align: center;
            animation: slideInUp 0.8s ease-out;
            color: #333;
            width: 100%;
            flex-shrink: 0;
        }
        
        .choice-container {
            background: #fff;
            padding: 30px 40px;
            border-radius: 15px;
            border: 1px solid #e9ecef;
            width: 100%;
            margin: 0;
        }
        
        .choice-question {
            font-size: 1.2rem;
            margin-bottom: 20px;
            color: #333;
            font-weight: 600;
        }
        
        .choice-options {
            display: flex;
            flex-direction: column;
            gap: 12px;
            max-width: 600px;
            margin: 0 auto;
        }
        
        .choice-button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            padding: 15px 25px;
            border-radius: 12px;
            color: white;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
            border: 1px solid transparent;
            font-family: inherit;
        }
        
        .choice-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
            border-color: rgba(255, 255, 255, 0.3);
        }
        
        .next-button {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            color: white;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3);
            border: 1px solid transparent;
            font-family: inherit;
            margin: 30px 0 15px 0;
            width: 100%;
        }
        
        .completion-screen {
            text-align: center;
            padding: 60px 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 20px;
            max-width: 600px;
            margin: 0 auto;
        }
        
        .completion-screen h1 {
            font-size: 2.5rem;
            margin-bottom: 20px;
            font-weight: 300;
        }
        
        .completion-screen p {
            font-size: 1.2rem;
            margin-bottom: 30px;
            line-height: 1.6;
        }
        
        .restart-button {
            background: rgba(255, 255, 255, 0.2);
            border: 2px solid rgba(255, 255, 255, 0.3);
            color: white;
            padding: 15px 30px;
            border-radius: 25px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }
        
        .restart-button:hover {
            background: rgba(255, 255, 255, 0.3);
            border-color: rgba(255, 255, 255, 0.5);
            transform: translateY(-2px);
        }
        
        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes float {
            0%, 100% {
                transform: translateX(-50%) translateY(0px);
            }
            50% {
                transform: translateX(-50%) translateY(-5px);
            }
        }
        
        @media (max-width: 768px) {
            .game-content {
                width: 100%;
                height: 100vh;
            }
            
            .background-image {
                height: calc(100vh - 150px);
            }
            
            .scene-title {
                font-size: 1.5rem;
            }
            
            .character-image {
                max-width: 300px;
                max-height: 360px;
            }
            
            .choice-container {
                padding: 20px;
            }
            
            .choice-button {
                padding: 12px 15px;
                font-size: 0.9rem;
            }
        }
    </style>
</head>
<body>
    <div id="root">
        <div class="game-container">
            <div class="game-content">
                <div class="background-image" id="backgroundImage">
                    <h1 class="scene-title" id="sceneTitle">Храм Души</h1>
                    
                    <div class="narrator-section">
                        <div class="narrator-text">
                            <p class="narrator-paragraph" id="narratorText">
                                Добро пожаловать в ваше духовное путешествие...
                            </p>
                        </div>
                    </div>

                    <div class="character-container" id="characterContainer" style="display: none;">
                        <img id="characterImage" class="character-image" alt="Character" />
                    </div>
                </div>

                <div class="scene-content" id="sceneContent">
                    <div class="choice-container" id="choiceContainer" style="display: none;">
                        <h3 class="choice-question" id="choiceQuestion"></h3>
                        <div class="choice-options" id="choiceOptions"></div>
                    </div>
                    <button id="nextButton" class="next-button" style="display: none;">Дальше</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Game data
        const gameData = [
            {
                id: 'scene_01',
                title: 'Природное Место',
                steps: [
                    {
                        id: 'scene_01_step_1',
                        title: 'Природное Место',
                        background: 'https://via.placeholder.com/800x600/4CAF50/FFFFFF?text=Scene+01+A',
                        narrator: 'Вы оказываетесь в каком-то очень комфортном, безопасном и приятном для вас природном месте. Может быть, это какой-то луг, а может быть лес или берег моря или реки. Любой образ подойдет.'
                    },
                    {
                        id: 'scene_01_step_2',
                        title: 'Природное Место',
                        background: 'https://via.placeholder.com/800x600/4CAF50/FFFFFF?text=Scene+01+A',
                        narrator: 'Оглядитесь по сторонам, поощущайте, как вы себя здесь чувствуете?',
                        choice: {
                            question: 'Как вы себя здесь чувствуете?',
                            options: [
                                { id: 'A', text: 'Уютно и защищенно.' },
                                { id: 'B', text: 'Спокойно и умиротворенно.' },
                                { id: 'C', text: 'Радостно и воодушевленно.' }
                            ]
                        }
                    }
                ]
            },
            {
                id: 'scene_01b',
                title: 'Тропинка',
                steps: [
                    {
                        id: 'scene_01b_step_1',
                        title: 'Тропинка',
                        background: 'https://via.placeholder.com/800x600/2196F3/FFFFFF?text=Scene+01+B',
                        narrator: 'Обратите внимание, что прямо под вашими ногами есть тропинка! Вы уже стоите на ней. Но это не просто тропинка. Это путь, который ведет вас к очень важному священному для вас месту - ХРАМУ ВАШЕЙ ДУШИ!'
                    },
                    {
                        id: 'scene_01b_step_2',
                        title: 'Тропинка',
                        background: 'https://via.placeholder.com/800x600/2196F3/FFFFFF?text=Scene+01+B',
                        narrator: 'Это очень важная встреча, как для вас, так и для самого храма. Вы начинаете двигаться по этой тропинке шаг за шагом.'
                    }
                ]
            },
            {
                id: 'scene_02',
                title: 'Храм Снаружи',
                steps: [
                    {
                        id: 'scene_02_step_1',
                        title: 'Храм Снаружи',
                        background: 'https://via.placeholder.com/800x600/FF9800/FFFFFF?text=Scene+02+A',
                        narrator: 'Проходит время и вот прямо перед вами появляется он - ваш храм! Как метафора, образ вашего тела! Это неповторимое и уникальное строение. Таких больше нет во всей Вселенной!'
                    },
                    {
                        id: 'scene_02_step_2',
                        title: 'Храм Снаружи',
                        background: 'https://via.placeholder.com/800x600/FF9800/FFFFFF?text=Scene+02+A',
                        narrator: 'Посмотрите на него со стороны. Какого он размера? Из чего он сделан? Какого он цвета, формы? Поисследуйте его со всех сторон. Какие у него окна? Какая дверь?'
                    },
                    {
                        id: 'scene_02_step_3',
                        title: 'Храм Снаружи',
                        background: 'https://via.placeholder.com/800x600/FF9800/FFFFFF?text=Scene+02+A',
                        narrator: 'Когда осмотрели его со всех сторон, сделайте глубокий вдох и выдох. И отследите, какие чувства вызывает у вас это строение, этот ваш персональный храм?',
                        choice: {
                            question: 'Что вы чувствуете, когда стоите на его пороге?',
                            options: [
                                { id: 'A', text: 'Глубокое восхищение и трепет.' },
                                { id: 'B', text: 'Искреннее любопытство и интерес.' },
                                { id: 'C', text: 'Легкую тревогу и волнение.' }
                            ]
                        }
                    }
                ]
            },
            {
                id: 'scene_02b',
                title: 'Дверь в Храм',
                steps: [
                    {
                        id: 'scene_02b_step_1',
                        title: 'Дверь в Храм',
                        background: 'https://via.placeholder.com/800x600/9C27B0/FFFFFF?text=Scene+02+B',
                        narrator: 'Возможно, вы уже заметили, что где-то в вашем храме души есть какие-то прорехи. Может быть, вы увидели немного покосившиеся стены или выбитое где-то окно? А может быть, наоборот ваш храм находится в идеальном состоянии? Просто обратите на это внимание.'
                    },
                    {
                        id: 'scene_02b_step_2',
                        title: 'Дверь в Храм',
                        background: 'https://via.placeholder.com/800x600/9C27B0/FFFFFF?text=Scene+02+B',
                        narrator: 'А теперь подойдите к двери в храм и почувствуйте, готовы ли переступить его порог? Войти и познакомиться поближе?',
                        choice: {
                            question: 'Готовы ли вы войти внутрь?',
                            options: [
                                { id: 'A', text: 'Да, я полностью готова.' },
                                { id: 'B', text: 'Мне нужно еще мгновение, чтобы собраться с духом.' },
                                { id: 'C', text: 'Да, но я войду с осторожностью.' }
                            ]
                        }
                    }
                ]
            },
            {
                id: 'scene_03',
                title: 'Внутри Храма',
                steps: [
                    {
                        id: 'scene_03_step_1',
                        title: 'Внутри Храма',
                        background: 'https://via.placeholder.com/800x600/E91E63/FFFFFF?text=Scene+03+A',
                        character: 'https://via.placeholder.com/300x400/607D8B/FFFFFF?text=Character+02',
                        narrator: 'Какие здесь звуки? Запахи? Что чувствуете? Этот храм - метафора вашего тела. И сегодня у вас есть уникальная возможность познакомиться с ним как будто изнутри! Узнать, что на самом деле волнует ваше тело?'
                    },
                    {
                        id: 'scene_03_step_2',
                        title: 'Внутри Храма',
                        background: 'https://via.placeholder.com/800x600/E91E63/FFFFFF?text=Scene+03+A',
                        character: 'https://via.placeholder.com/300x400/607D8B/FFFFFF?text=Character+02',
                        narrator: 'Оглядитесь по сторонам, как исследователь, с истинным внутренним интересом, принятием, заботой и любовью! И посмотрите, все ли здесь в порядке?'
                    },
                    {
                        id: 'scene_03_step_3',
                        title: 'Внутри Храма',
                        background: 'https://via.placeholder.com/800x600/E91E63/FFFFFF?text=Scene+03+A',
                        character: 'https://via.placeholder.com/300x400/607D8B/FFFFFF?text=Character+02',
                        narrator: 'Я ждала тебя. Я — дух этого храма. Твой дух.'
                    },
                    {
                        id: 'scene_03_step_4',
                        title: 'Внутри Храма',
                        background: 'https://via.placeholder.com/800x600/E91E63/FFFFFF?text=Scene+03+A',
                        character: 'https://via.placeholder.com/300x400/607D8B/FFFFFF?text=Character+02',
                        narrator: 'Возможно, вы увидели перекошенные стены, разбитое окно, неровный пол или еще какие-то уязвимые места. Почувствуйте, что это за метафора именно для вас? О чем через эту метафору ваше тело говорит вам?',
                        choice: {
                            question: 'Что требует твоего внимания больше всего?',
                            options: [
                                { id: 'A', text: 'Стены, которым нужна поддержка и прочность.' },
                                { id: 'B', text: 'Окна, через которые хочется видеть мир яснее.' },
                                { id: 'C', text: 'Фундамент, которому не хватает ощущения опоры.' }
                            ]
                        }
                    }
                ]
            },
            {
                id: 'scene_04',
                title: 'Исцеление',
                steps: [
                    {
                        id: 'scene_04_step_1',
                        title: 'Исцеление',
                        background: 'https://via.placeholder.com/800x600/00BCD4/FFFFFF?text=Scene+04+A',
                        character: 'https://via.placeholder.com/300x400/607D8B/FFFFFF?text=Character+02',
                        narrator: 'Ты давно ждала этой встречи. Я тоже. Чтобы ты уделила мне внимание, подарила свою любовь и помогла исцелить что-то важное. Чтобы нам стало еще лучше, еще комфортнее.'
                    },
                    {
                        id: 'scene_04_step_2',
                        title: 'Исцеление',
                        background: 'https://via.placeholder.com/800x600/00BCD4/FFFFFF?text=Scene+04+A',
                        character: 'https://via.placeholder.com/300x400/607D8B/FFFFFF?text=Character+02',
                        narrator: 'И представьте, что какой-то очень приятный цвет льется на вас откуда-то сверху. И заполняет все вокруг, каждую клеточку тела. Исцеляет и заполняет все трещинки на стенах вашего храма, все неровности, изъяны и уязвимости.'
                    },
                    {
                        id: 'scene_04_step_3',
                        title: 'Исцеление',
                        background: 'https://via.placeholder.com/800x600/00BCD4/FFFFFF?text=Scene+04+A',
                        character: 'https://via.placeholder.com/300x400/607D8B/FFFFFF?text=Character+02',
                        narrator: 'Напитывает, исцеляет, трансформирует. А вы просто дышите, пропускаете через тело все эти процессы, позволяете им произойти.'
                    }
                ]
            },
            {
                id: 'scene_05',
                title: 'Единение',
                steps: [
                    {
                        id: 'scene_05_step_1',
                        title: 'Единение',
                        background: 'https://via.placeholder.com/800x600/795548/FFFFFF?text=Scene+05+A',
                        character: 'https://via.placeholder.com/300x400/FF5722/FFFFFF?text=Character+01',
                        narrator: 'Ваша фигура становится больше, и вы становитесь с храмом единым целым! Почувствуйте, как этот храм трансформируется и становится такого самого подходящего для вас размера, чтобы уместить всю силу, мощь, масштаб и величие вашего духа, вашей души!'
                    },
                    {
                        id: 'scene_05_step_2',
                        title: 'Единение',
                        background: 'https://via.placeholder.com/800x600/795548/FFFFFF?text=Scene+05+A',
                        character: 'https://via.placeholder.com/300x400/FF5722/FFFFFF?text=Character+01',
                        narrator: 'Вы становитесь чем-то единым! Уникальным! Невероятно великим! Сделайте глубокий вдох и выдох с этим ощущением!',
                        choice: {
                            question: 'Назовите, что это за ощущение именно для вас?',
                            options: [
                                { id: 'A', text: 'Это ощущение абсолютной Целостности.' },
                                { id: 'B', text: 'Это ощущение безграничной Силы.' },
                                { id: 'C', text: 'Это ощущение всеобъемлющей Любви.' }
                            ]
                        }
                    }
                ]
            },
            {
                id: 'ending',
                title: 'Завершение',
                steps: [
                    {
                        id: 'ending_step_1',
                        title: 'Завершение',
                        background: 'https://via.placeholder.com/800x600/795548/FFFFFF?text=Scene+05+A',
                        character: 'https://via.placeholder.com/300x400/FF5722/FFFFFF?text=Character+01',
                        narrator: 'Когда ваш храм души теперь стал таким и вы находитесь с ним в тесном контакте!!! Вы единое целое, вы неразделимы в этой жизни на этой Земле!'
                    },
                    {
                        id: 'ending_step_2',
                        title: 'Завершение',
                        background: 'https://via.placeholder.com/800x600/795548/FFFFFF?text=Scene+05+A',
                        character: 'https://via.placeholder.com/300x400/FF5722/FFFFFF?text=Character+01',
                        narrator: 'И почувствуйте, как вы хотели бы завершить на сегодня этот образ. Попрощайтесь с ним и помните, что вы всегда можете к нему вернуться.'
                    }
                ]
            }
        ];

        // Game state
        let currentSceneIndex = 0;
        let currentStepIndex = 0;
        let choices = {};
        let isGameComplete = false;

        // DOM elements
        const backgroundImage = document.getElementById('backgroundImage');
        const sceneTitle = document.getElementById('sceneTitle');
        const narratorText = document.getElementById('narratorText');
        const characterContainer = document.getElementById('characterContainer');
        const characterImage = document.getElementById('characterImage');
        const sceneContent = document.getElementById('sceneContent');
        const choiceContainer = document.getElementById('choiceContainer');
        const choiceQuestion = document.getElementById('choiceQuestion');
        const choiceOptions = document.getElementById('choiceOptions');
        const nextButton = document.getElementById('nextButton');

        // Game functions
        function getCurrentStep() {
            const currentScene = gameData[currentSceneIndex];
            return currentScene?.steps[currentStepIndex];
        }

        function isLastScene() {
            return currentSceneIndex === gameData.length - 1;
        }

        function isLastStep() {
            const currentScene = gameData[currentSceneIndex];
            return currentStepIndex === (currentScene?.steps.length || 1) - 1;
        }

        function updateDisplay() {
            const currentStep = getCurrentStep();
            if (!currentStep) return;

            // Update background
            backgroundImage.style.backgroundImage = \`url(\${currentStep.background})\`;
            
            // Update title
            sceneTitle.textContent = currentStep.title;
            
            // Update narrator text
            narratorText.textContent = currentStep.narrator;
            
            // Update character
            if (currentStep.character) {
                characterContainer.style.display = 'block';
                characterImage.src = currentStep.character;
            } else {
                characterContainer.style.display = 'none';
            }
            
            // Update choices or next button
            if (currentStep.choice) {
                choiceContainer.style.display = 'block';
                nextButton.style.display = 'none';
                choiceQuestion.textContent = currentStep.choice.question;
                
                choiceOptions.innerHTML = '';
                currentStep.choice.options.forEach(option => {
                    const button = document.createElement('button');
                    button.className = 'choice-button';
                    button.textContent = option.text;
                    button.onclick = () => handleChoice(option.id);
                    choiceOptions.appendChild(button);
                });
            } else {
                choiceContainer.style.display = 'none';
                nextButton.style.display = 'block';
            }
        }

        function handleChoice(choiceId) {
            const currentStep = getCurrentStep();
            choices[currentStep.id] = choiceId;
            
            if (isLastStep()) {
                if (isLastScene()) {
                    showCompletionScreen();
                } else {
                    currentSceneIndex++;
                    currentStepIndex = 0;
                }
            } else {
                currentStepIndex++;
            }
            
            updateDisplay();
        }

        function handleNext() {
            if (isLastStep()) {
                if (isLastScene()) {
                    showCompletionScreen();
                } else {
                    currentSceneIndex++;
                    currentStepIndex = 0;
                }
            } else {
                currentStepIndex++;
            }
            
            updateDisplay();
        }

        function showCompletionScreen() {
            isGameComplete = true;
            sceneContent.innerHTML = \`
                <div class="completion-screen">
                    <h1>Путешествие завершено</h1>
                    <p>Вы прошли через храм своей души и обрели внутреннюю гармонию.</p>
                    <div class="choices-summary">
                        <h3>Ваши выборы:</h3>
                        \${Object.entries(choices).map(([stepId, choiceId]) => {
                            let foundStep = null;
                            let foundScene = null;
                            
                            for (const scene of gameData) {
                                const step = scene.steps.find(s => s.id === stepId);
                                if (step && step.choice) {
                                    foundStep = step;
                                    foundScene = scene;
                                    break;
                                }
                            }
                            
                            const choice = foundStep?.choice?.options.find(opt => opt.id === choiceId);
                            return \`<div class="choice-item"><strong>\${foundScene?.title}:</strong> \${choice?.text}</div>\`;
                        }).join('')}
                    </div>
                    <button class="restart-button" onclick="resetGame()">Начать заново</button>
                </div>
            \`;
        }

        function resetGame() {
            currentSceneIndex = 0;
            currentStepIndex = 0;
            choices = {};
            isGameComplete = false;
            updateDisplay();
        }

        // Event listeners
        nextButton.onclick = handleNext;

        // Initialize game
        updateDisplay();
    </script>
</body>
</html>`;

    return htmlContent;
};

// Create the deployable HTML file
const htmlContent = createDeployableHTML();
fs.writeFileSync(path.join(__dirname, 'index.html'), htmlContent);

console.log('✅ Created deployable HTML file: index.html');
console.log('📁 You can now upload this file to any static hosting service like:');
console.log('   - Netlify Drop: https://app.netlify.com/drop');
console.log('   - GitHub Pages');
console.log('   - Vercel');
console.log('   - Any web hosting service');
console.log('\n🎮 Your game is ready to deploy!');
