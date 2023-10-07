// @flow
import React from 'react';
import styled from 'styled-components';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween, Timeline } from 'react-gsap';

const SectionWipes2Styled = styled.div`
  overflow: hidden;
  color: white;
  position: absolute

  #pinContainer {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }

  #pinContainer .panel {
    height: 100vh;
    width: 100vw;
    position: absolute;
    text-align: center;
  }

  .panel span {
    position: relative;
    display: block;
    top: 50%;
    font-size: 50px;
    font-weight: 900;
  }
  
  .panel.intro{
    transform: translate(0%, -40%);

  }
  .panel.name {
    transform: translate(0%, -20%);
  }
  
  .panel.react-dev {
    
  }
  
  .panel.full-dev {
   
  }
  

`;

const SectionWipes2 = (props) => 
{ 
  console.log("here", props.children)
  return (
  <SectionWipes2Styled>
    <Controller>
      <Scene
        triggerHook="onLeave"
        duration="100%"
        pin
      >
        <Timeline
          wrapper={<div id="pinContainer"/>}
        >
          <Tween
          position="0"
            from={{
              top: '0%',
              scale: 1.5,
            }}
            to={{
              top: '70%',
              scale: 2,
            }}
          >
            <section className="panel intro"><span>Welcome</span> </section>
          
          </Tween>
          
          <Tween
            from={{ x: '-100%' }}
            to={{ x: '0%' }}
          >
            <section className="panel name"><span>I'm Prasanna Nivas</span></section>
          </Tween>

          <Tween
            from={{ x: '100%' }}
            to={{ x: '-100%' }}
          >
            <section className="panel react-dev"><span> <del>React Developer</del></span></section>
          </Tween>
          <Tween
            from={{ y: '-100%' }}
            to={{ y: '0%'}}
          >
            <section className="panel full-dev"><span>Full Stack Developer</span></section>
          </Tween>
        </Timeline>
      </Scene>
    </Controller>
  </SectionWipes2Styled>
)};

export default SectionWipes2;