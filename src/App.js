import { useState, useEffect } from 'react'
import './App.css'


const sound1= [
{
  keyCode: 81,
  keyTrigger: "Q",
  id: "Heater-1",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
}, {
  keyCode: 87,
  keyTrigger: "W",
  id: "Heater-2",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
}, {
  keyCode: 69,
  keyTrigger: "E",
  id: "Heater-3",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
}, {
  keyCode: 65,
  keyTrigger: "A",
  id: "Heater-4",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
}, {
  keyCode: 83,
  keyTrigger: "S",
  id: "Clap",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
}, {
  keyCode: 68,
  keyTrigger: "D",
  id: "Open-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
}, {
  keyCode: 90,
  keyTrigger: "Z",
  id: "Kick-n'-Hat",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
}, {
  keyCode: 88,
  keyTrigger: "X",
  id: "Kick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
}, {
  keyCode: 67,
  keyTrigger: "C",
  id: "Closed-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
}];
const sound2= [
{
  keyCode: 81,
  keyTrigger: "Q",
  id: "Chord-1",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
}, {
  keyCode: 87,
  keyTrigger: "W",
  id: "Chord-2",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
}, {
  keyCode: 69,
  keyTrigger: "E",
  id: "Chord-3",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
}, {
  keyCode: 65,
  keyTrigger: "A",
  id: "Shaker",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
}, {
  keyCode: 83,
  keyTrigger: "S",
  id: "Open-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
}, {
  keyCode: 68,
  keyTrigger: "D",
  id: "Closed-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
}, {
  keyCode: 90,
  keyTrigger: "Z",
  id: "Punchy-Kick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
}, {
  keyCode: 88,
  keyTrigger: "X",
  id: "Side-Stick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
}, {
  keyCode: 67,
  keyTrigger: "C",
  id: "Snare",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
}];

const soundsName = {
  heaterKit: "Heater Kit",
  smoothPianoKit: "Smooth Piano Kit "
};

const soundsGroup = {
  heaterKit: sound1,
  smoothPianoKit: sound2
};

const KeyboardKey = ({ play, soundName, deactivateAudio, d: {id, keyTrigger, url, keyCode}}) => {

  const handleKeydown = (d) => {
    if(d.keyCode === keyCode){
      const audio = document.getElementById(keyTrigger);
      play(keyTrigger, id);
      deactivateAudio(audio);
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
  }, [soundName])
  return (
    <button id={keyCode} className='drum-pad' onClick={() => play(keyTrigger, id)}>
      <audio className='clip' id={keyTrigger} src={url} />
      {keyTrigger}
    </button>
  )
}

const KeyBoard = ({power, play, sounds, deactivateAudio}) => {
  return (
  <div className="keyboard">
    {power 
      ? sounds.map(d  => <KeyboardKey d={d} play={play} deactivateAudio={deactivateAudio} />)
      : sounds.map(d => <KeyboardKey d={{...d, url: "#" }} play={play} deactivateAudio={deactivateAudio} />)        
    }
  </div>
)}

const ControlSound = ({ stop, power, name, volume, handleVolume, changeSoundsGroup}) => {
  return (
  <div className='controler'>
    <button onClick={stop}>Power {power ? "ON" : "OFF"}</button>
    <h3>Volume: {Math.round(volume*100)} %</h3>
    <input max='1' min='0' step='0.01' type='range' value={volume} onChange={handleVolume} />
    <h3 id='display'>{name}</h3>
    <button onClick={changeSoundsGroup}>Bank</button>
  </div>
  )
}
function App() {
  const [power, setPower] = useState(true);
  const [volume, setVolume] = useState(1);
  const [soundName, setSoundName]=useState("");
  const [type, setType]= useState("heaterKit");
  const [sounds, setSounds] = useState(soundsGroup[type]);

  const styleActiveKey = (keyTrigger) => {
    keyTrigger.parentElement.style.backgroundColor = "#000000"
    keyTrigger.parentElement.style.color = "#dddbcb"
  }
  
  const deActivatedKey = (audio) => {
    audio.parentElement.style.backgroundColor = "#dddbcb"
    audio.parentElement.style.color = "#000000"
  }
 
 const deactivateAudio = (audio) => {
   setTimeout(() => {
     audio.parentElement.style.backgroundColor = "#dddbcb"
     audio.parentElement.style.color = "#000000"
   }, 300)
 }

  const stop = () => {
    setPower(!power);
  }
  const handleVolume = (d) => {
    setVolume(d.target.value)
  }
  const play = (keyTrigger:string, id:string) => {
    setSoundName(id);
    const audio = document.getElementById(keyTrigger)
    styleActiveKey(audio);
    audio.currentTime=0;
    audio.play();
    deactivateAudio(audio);
  }

  const setKeyVolume = () => {
    const audios = sounds.map((d: { keyTrigger: string; }) => document.getElementById(d.keyTrigger))
    audios.forEach( (audio: { volume: number; }) => {
      if(audio){
        audio.volume = volume
      }
    })
  }

  const changeSoundsGroup = () => {
    setSoundName("");
    if(type === "heaterKit"){
      setType("smoothPianoKit");
      setSounds(soundsGroup.smoothPianoKit);
    } else {
      setType("heaterKit");
      setSounds(soundsGroup.heaterKit);
    }
  }

  return (
    <div className='container' id='drum-machine'>
      <h1 className='title'>Drum Machine</h1>
      {setKeyVolume()}
      <div className="wrapper">
      <KeyBoard  power={power} play={play} sounds={sounds} deactivateAudio={deactivateAudio}/>
      <ControlSound name={soundName || soundsName[type]} 
                    changeSoundsGroup={changeSoundsGroup}
                    volume={volume}
                    handleVolume={handleVolume}
                    power={power}
                    stop={stop} />
      </div>
    </div> 
  )
}


export default App;
