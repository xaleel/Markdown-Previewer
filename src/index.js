import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { marked } from 'marked';

class App extends Component {
    constructor(props){
      super(props);
      this.state = {
      areaSize: 1
      }

      this.light = this.light.bind(this)
      this.blue = this.blue.bind(this)
      this.dark = this.dark.bind(this)
      this.red = this.red.bind(this)
      this.green = this.green.bind(this)
      this.expand = this.expand.bind(this)
      this.retract = this.retract.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.clear = this.clear.bind(this)
      this.putSample = this.putSample.bind(this)
      this.copy = this.copy.bind(this)
    }

    componentDidMount(){
      this.handleChange();
      this.putSample();
      this.handleChange();
    }

    light = () => {
      document.querySelector('#main').className = 'main';
      document.querySelector('textarea').className = '';
      document.querySelector('#toolbar1').className = '';
      document.querySelector('#toolbar2').className = '';
    }

    blue = () => {
      document.querySelector('#main').className = 'main blue';
      document.querySelector('textarea').className = 'blue';
      document.querySelector('#toolbar1').className = 'blue';
      document.querySelector('#toolbar2').className = 'blue';
    }

    dark = () => {
      document.querySelector('#main').className = 'main dark';
      document.querySelector('textarea').className = 'dark';
      document.querySelector('#toolbar1').className = 'dark';
      document.querySelector('#toolbar2').className = 'dark';
    }

    red = () => {
      document.querySelector('#main').className = 'main red';
      document.querySelector('textarea').className = 'red';
      document.querySelector('#toolbar1').className = 'red';
      document.querySelector('#toolbar2').className = 'red';
    }

    green = () => {
      document.querySelector('#main').className = 'main green';
      document.querySelector('textarea').className = 'green';
      document.querySelector('#toolbar1').className = 'green';
      document.querySelector('#toolbar2').className = 'green';
    }

    expand = () => {
      switch(this.state.areaSize){
        case 0:
          document.getElementById('section').style.display = 'flex';
          document.getElementById('section').style.flexDirection = 'column';
          document.getElementById('field').style.gridTemplateColumns = '1fr 1fr';
          this.setState({areaSize: 1});
          break;
        case 1:
          document.getElementById('field').style.gridTemplateColumns = '2fr 1fr';
          this.setState({areaSize: 2});
          break;
        case 2:
          document.getElementById('sec2').style.display = 'none';
          document.getElementById('field').style.gridTemplateColumns = '1fr';
          this.setState({areaSize: 3});
          break;
        default:
          console.log('error')
      }
    }

    retract = () => {
      switch(this.state.areaSize){
        case 3:
          document.getElementById('sec2').style.display = 'flex';
          document.getElementById('sec2').style.flexDirection = 'column';
          document.getElementById('field').style.gridTemplateColumns = '2fr 1fr';
          this.setState({areaSize: 2})
          break;
        case 2:
          document.getElementById('field').style.gridTemplateColumns = '1fr 1fr';
          this.setState({areaSize: 1})
          break;
        case 1:
          document.getElementById('section').style.display = 'none';
          document.getElementById('field').style.gridTemplateColumns = '1fr';
          this.setState({areaSize: 0});
          break;
        default:
          console.log('error')
      }
    }

    handleChange = () => {
      document.querySelector('#preview').innerHTML = marked.parse(document.querySelector('#editor').value)
    }

    putSample = () => {
      document.querySelector('#editor').value = sample();
      this.handleChange();
    }

    clear = () => {
      document.querySelector('#editor').value = '';
      this.handleChange();
    }

    copy = (event) => {
      var copyText = document.getElementById("editor");
      copyText.select();
      copyText.setSelectionRange(0, 99999); //for mobile devices
      //document.execCommand("copy")
      navigator.permissions.query({name: "clipboard-write"}).then(result => {
        console.log(result.state)
        if (result.state === "granted" || result.state === "prompt") {
          navigator.clipboard.writeText(copyText.value);
          document.querySelector('#copied').animate([{opacity: 0}, {opacity: 1}, {opacity: 1}, {opacity: 1}, {opacity: 0}], {duration: 1250});
        } else {
          document.querySelector('#copied').innerHTML = 'Error: text cannot be copied on this site/browser'
          document.querySelector('#copied').animate([{opacity: 0}, {opacity: 1}, {}, {}, {}, {}, {opacity: 1}, {opacity: 0}], {duration: 1250});
        }
      });
      window.getSelection().removeAllRanges();
    }

    render(){
      let arrow, exp;
      let copyButton = <div onClick={ this.copy }><i id='copy' className="fa-solid fa-copy"></i></div>
      let clearButton = <div onClick={() => { return window.confirm('Clear input field?') ? this.clear() : null } }><i id='clear' className="fa-solid fa-trash-can"></i></div>
      let sampleButton = <div onClick={() => { return window.confirm('Clear input field and insert sample text?') ? this.putSample() : null } }><i id='sample' className="fa-solid fa-file-lines"></i></div>
      switch (this.state.areaSize){
        case 0:
          arrow = (<div className='arrows'>
                    <p id='copied'>Copied to clipboard</p>
                    {copyButton}
                    {clearButton}
                    {sampleButton}
                    <div style={{display: 'none'}} id='lArrow' onClick={this.retract}><i id='resizeL' className="fa-solid fa-angles-left"></i></div>
                    <div id='rArrow' onClick={this.expand}><i id='resizeR' className="fa-solid fa-angles-right"></i></div>
                  </div>)
          exp = <div id='rArrow' onClick={this.expand}><i id='resizeR' className="fa-solid fa-angles-right"></i></div>;
          break;
        case 1: case 2:
          arrow = (<div className='arrows'>
                    <p id='copied'>Copied to clipboard</p>
                    {copyButton}
                    {clearButton}
                    {sampleButton}
                    <div id='lArrow' onClick={this.retract}><i id='resizeL' className="fa-solid fa-angles-left"></i></div>
                    <div id='rArrow' onClick={this.expand}><i id='resizeR' className="fa-solid fa-angles-right"></i></div>
                  </div>)
          break;
        case 3:
          arrow =(<div className='arrows'>
                    <p id='copied'>Copied to clipboard</p>
                    {copyButton}
                    {clearButton}
                    {sampleButton}
                    <div id='lArrow' onClick={this.retract}><i id='resizeR' className="fa-solid fa-angles-left"></i></div>
                  </div>)
          break;
        default:
          console.log('error')
      } 
      
      return (
        <div id='main' className='main'>
          <h1 id='title1'>Markdown Previewer</h1>
          <div id='field'>
            <div id='section'>
              <div id='toolbar1'>
                <h3 id='title3'>Editor</h3>
                {arrow}
              </div>
              <textarea id='editor' onChange={this.handleChange}/>
            </div>
            <div id='sec2'>
              <div id='toolbar2'>
                {exp}
                <h3 id='title3'>Preview</h3>
                <div></div>
              </div>
              <div id='preview'></div>
            </div>
          </div>
          <div id='container'>
            <div id='colors'>
              <button onClick={this.light} style={{marginLeft: 0}}></button>
              <button onClick={this.blue} style={{backgroundColor: '#2970ad'}}></button>
              <button onClick={this.dark} style={{backgroundColor: '#313236'}}></button>
              <button onClick={this.red} style={{backgroundColor: 'rgb(165 32 32'}}></button>
              <button onClick={this.green} style={{backgroundColor: 'rgb(70, 146, 70)'}}></button>
              <span className='tooltiptext'>Color theme</span>
            </div>  
          </div>
        </div>
      )
    }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

function sample(){
  let text = `# Welcome to my React Markdown Previewer!

  ## This is a sub-heading...
  ### And here's some other cool stuff:
  
  Heres some code, \`<div></div>\`, between 2 backticks.
  
  \`\`\`
  // this is multi-line code:
  
  function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
      return multiLineCode;
    }
  }
  \`\`\`
  
  You can also make text **bold**... whoa!
  Or _italic_.
  Or... wait for it... **_both!_**
  And feel free to go crazy ~~crossing stuff out~~.
  
  There's also [links](https://www.freecodecamp.org), and
  > Block Quotes!
  
  And if you want to get really crazy, even tables:
  
  Wild Header | Crazy Header | Another Header?
  ------------ | ------------- | -------------
  Your content can | be here, and it | can be here....
  And here. | Okay. | I think we get it.
  
  - And of course there are lists.
    - Some are bulleted.
       - With different indentation levels.
          - That look like this.
  
  
  1. And there are numbered lists too.
  1. Use just 1s if you want!
  1. And last but not least, let's not forget embedded images:
  ![cat](https://pbs.twimg.com/profile_images/664169149002874880/z1fmxo00_400x400.jpg)
  `
  return text;
}
