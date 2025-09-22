import React, { useState } from 'react';
import './App.css';

interface Choice {
  id: string;
  text: string;
}

interface SceneStep {
  id: string;
  title: string;
  background: string;
  character?: string;
  narrator: string;
  choice?: {
    question: string;
    options: Choice[];
  };
}

interface Scene {
  id: string;
  title: string;
  steps: SceneStep[];
}

const gameData: Scene[] = [
  {
    id: 'scene_01',
    title: 'Природное Место',
    steps: [
      {
        id: 'scene_01_step_1',
        title: 'Природное Место',
        background: 'scene_01_a',
        narrator: 'Вы оказываетесь в каком-то очень комфортном, безопасном и приятном для вас природном месте. Может быть, это какой-то луг, а может быть лес или берег моря или реки. Любой образ подойдет.'
      },
      {
        id: 'scene_01_step_2',
        title: 'Природное Место',
        background: 'scene_01_a',
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
        background: 'scene_01_b',
        narrator: 'Обратите внимание, что прямо под вашими ногами есть тропинка! Вы уже стоите на ней. Но это не просто тропинка. Это путь, который ведет вас к очень важному священному для вас месту - ХРАМУ ВАШЕЙ ДУШИ!'
      },
      {
        id: 'scene_01b_step_2',
        title: 'Тропинка',
        background: 'scene_01_b',
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
        background: 'scene_02_a',
        narrator: 'Проходит время и вот прямо перед вами появляется он - ваш храм! Как метафора, образ вашего тела! Это неповторимое и уникальное строение. Таких больше нет во всей Вселенной!'
      },
      {
        id: 'scene_02_step_2',
        title: 'Храм Снаружи',
        background: 'scene_02_a',
        narrator: 'Посмотрите на него со стороны. Какого он размера? Из чего он сделан? Какого он цвета, формы? Поисследуйте его со всех сторон. Какие у него окна? Какая дверь?'
      },
      {
        id: 'scene_02_step_3',
        title: 'Храм Снаружи',
        background: 'scene_02_a',
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
        background: 'scene_02_b',
        narrator: 'Возможно, вы уже заметили, что где-то в вашем храме души есть какие-то прорехи. Может быть, вы увидели немного покосившиеся стены или выбитое где-то окно? А может быть, наоборот ваш храм находится в идеальном состоянии? Просто обратите на это внимание.'
      },
      {
        id: 'scene_02b_step_2',
        title: 'Дверь в Храм',
        background: 'scene_02_b',
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
        background: 'scene_03_a',
        character: 'character_02_a',
        narrator: 'Какие здесь звуки? Запахи? Что чувствуете? Этот храм - метафора вашего тела. И сегодня у вас есть уникальная возможность познакомиться с ним как будто изнутри! Узнать, что на самом деле волнует ваше тело?'
      },
      {
        id: 'scene_03_step_2',
        title: 'Внутри Храма',
        background: 'scene_03_a',
        character: 'character_02_a',
        narrator: 'Оглядитесь по сторонам, как исследователь, с истинным внутренним интересом, принятием, заботой и любовью! И посмотрите, все ли здесь в порядке?'
      },
      {
        id: 'scene_03_step_3',
        title: 'Внутри Храма',
        background: 'scene_03_a',
        character: 'character_02_a',
        narrator: 'Я ждала тебя. Я — дух этого храма. Твой дух.'
      },
      {
        id: 'scene_03_step_4',
        title: 'Внутри Храма',
        background: 'scene_03_a',
        character: 'character_02_a',
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
        background: 'scene_04_a',
        character: 'character_02_a',
        narrator: 'Ты давно ждала этой встречи. Я тоже. Чтобы ты уделила мне внимание, подарила свою любовь и помогла исцелить что-то важное. Чтобы нам стало еще лучше, еще комфортнее.'
      },
      {
        id: 'scene_04_step_2',
        title: 'Исцеление',
        background: 'scene_04_a',
        character: 'character_02_a',
        narrator: 'И представьте, что какой-то очень приятный цвет льется на вас откуда-то сверху. И заполняет все вокруг, каждую клеточку тела. Исцеляет и заполняет все трещинки на стенах вашего храма, все неровности, изъяны и уязвимости.'
      },
      {
        id: 'scene_04_step_3',
        title: 'Исцеление',
        background: 'scene_04_a',
        character: 'character_02_a',
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
        background: 'scene_05_a',
        character: 'character_01_a',
        narrator: 'Ваша фигура становится больше, и вы становитесь с храмом единым целым! Почувствуйте, как этот храм трансформируется и становится такого самого подходящего для вас размера, чтобы уместить всю силу, мощь, масштаб и величие вашего духа, вашей души!'
      },
      {
        id: 'scene_05_step_2',
        title: 'Единение',
        background: 'scene_05_a',
        character: 'character_01_a',
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
        background: 'scene_05_a',
        character: 'character_01_a',
        narrator: 'Когда ваш храм души теперь стал таким и вы находитесь с ним в тесном контакте!!! Вы единое целое, вы неразделимы в этой жизни на этой Земле!'
      },
      {
        id: 'ending_step_2',
        title: 'Завершение',
        background: 'scene_05_a',
        character: 'character_01_a',
        narrator: 'И почувствуйте, как вы хотели бы завершить на сегодня этот образ. Попрощайтесь с ним и помните, что вы всегда можете к нему вернуться.'
      }
    ]
  }
];

function App() {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [choices, setChoices] = useState<{[key: string]: string}>({});
  const [isGameComplete, setIsGameComplete] = useState(false);

  const currentScene = gameData[currentSceneIndex];
  const currentStep = currentScene?.steps[currentStepIndex];
  const isLastScene = currentSceneIndex === gameData.length - 1;
  const isLastStep = currentStepIndex === (currentScene?.steps.length || 1) - 1;

  const getImagePath = (imageName: string) => {
    return `/images/${imageName}.png`;
  };

  const handleChoice = (choiceId: string) => {
    const newChoices = {
      ...choices,
      [currentStep?.id || '']: choiceId
    };
    setChoices(newChoices);

    // Move to next step or next scene
    if (isLastStep) {
      if (isLastScene) {
        setIsGameComplete(true);
      } else {
        setCurrentSceneIndex(currentSceneIndex + 1);
        setCurrentStepIndex(0);
      }
    } else {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleNext = () => {
    // Move to next step or next scene
    if (isLastStep) {
      if (isLastScene) {
        setIsGameComplete(true);
      } else {
        setCurrentSceneIndex(currentSceneIndex + 1);
        setCurrentStepIndex(0);
      }
    } else {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const resetGame = () => {
    setCurrentSceneIndex(0);
    setCurrentStepIndex(0);
    setChoices({});
    setIsGameComplete(false);
  };

  if (isGameComplete) {
    return (
      <div className="game-container">
        <div className="completion-screen">
          <h1>Путешествие завершено</h1>
          <p>Вы прошли через храм своей души и обрели внутреннюю гармонию.</p>
          <div className="choices-summary">
            <h3>Ваши выборы:</h3>
            {Object.entries(choices).map(([stepId, choiceId]) => {
              // Find the step that contains this choice
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
              
              const choice = foundStep?.choice?.options.find((opt: Choice) => opt.id === choiceId);
              return (
                <div key={stepId} className="choice-item">
                  <strong>{foundScene?.title}:</strong> {choice?.text}
                </div>
              );
            })}
          </div>
          <div className="completion-buttons">
            <button onClick={resetGame} className="restart-button">
              Начать заново
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="game-content">
        <div 
          className="background-image"
          style={{
            backgroundImage: `url(${getImagePath(currentStep?.background || '')})`
          }}
        >
          <h1 className="scene-title">{currentStep?.title || ''}</h1>
          
          <div className="narrator-section">
            <div className="narrator-text">
              <p className="narrator-paragraph">
                {currentStep?.narrator || ''}
              </p>
            </div>
          </div>

          {currentStep?.character && (
            <div className="character-container">
              <img 
                src={getImagePath(currentStep.character)} 
                alt="Character" 
                className="character-image"
              />
            </div>
          )}
        </div>

        <div className="scene-content">
          {currentStep?.choice ? (
            <div className="choice-container">
              <h3 className="choice-question">{currentStep.choice.question}</h3>
              <div className="choice-options">
                {currentStep.choice.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleChoice(option.id)}
                    className="choice-button"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button onClick={handleNext} className="next-button">
              Дальше
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;