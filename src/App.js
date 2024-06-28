import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import React, { useState, createContext, useContext, useEffect } from 'react';
import {useMediaQuery} from 'react-responsive';
import {app, database, storage} from './FirebasePortfolio.js'
import { ref, onValue } from 'firebase/database';

// import projectsdat from './projects_data.json'
import ProjectInfo from './project';
import './App.css';
import AboutLink from './components/AboutLink';
import AboutPlainText from './components/AboutPlainText';


const Mobile = ({children}) => {
  const isMobile = useMediaQuery({
    query : "(max-width:768px)"
  });
  
  return <>{isMobile && children}</>
}

const PC = ({children}) => {
  const isPc = useMediaQuery({
    query : "(min-width:769px)"
  });
  
  return <>{isPc && children}</>
}


let StateContext = createContext({
  stat: 'home',
  selectedProject: null,
  setStat: () => {},
  setSelectedProject: () => {}
});

function ProjectWrapper(props){
  const titleStyle = {
    fontSize : 'medium',
    fontWeight: 'normal',
    paddingLeft : '10px'
  }
  const navigate = useNavigate();

  const { setStat, setSelectedProject } = useContext(StateContext);

  const [sortState, setSort] = useState('year');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const dbRef = ref(database, '/data');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setProjects(data ? Object.values(data) : []);
    });
  }, []);

  const goToProject = (project) => {
    setStat('project');
    setSelectedProject(project);
  };


  
  const sortYear = (i) => {
    projects.sort((a, b) => i === 0 
      ? Number(b.year) - Number(a.year) 
      : Number(a.year) - Number(b.year)).sort((a, b) => a.status.localeCompare(b.status));
  };
  
  const sortType = (i) => {
    projects.sort((a, b) => i === 0 
      ? b.type.localeCompare(a.type) 
      : a.type.localeCompare(b.type)).sort((a, b) => a.status.localeCompare(b.status));
  };
  
  const sortName = (i) => {
    projects.sort((a, b) => i === 0 
      ? b.title.localeCompare(a.title) 
      : a.title.localeCompare(b.title)).sort((a, b) => a.status.localeCompare(b.status));
  };
  
  const sortScope = (i) => {
    projects.sort((a, b) => i === 0 
      ? b.scope.localeCompare(a.scope) 
      : a.scope.localeCompare(b.scope)).sort((a, b) => a.status.localeCompare(b.status));
  };
  
  
  switch(sortState){
    case'type' :
      sortType(0);
      break;
    case 'name' :
      sortName(0);
      break;
    case 'scope' :
      sortScope(0);
      break;
    case'type1' :
      sortType(1);
      break;
    case 'name1' :
      sortName(1);
      break;
    case 'year1' :
      sortYear(1);
      break;
    case 'scope1' :
      sortScope(1);
      break;
    default :
      sortYear(0);
      break;
  }
  

  if(props.mobile === 'true'){
    return(
      <section className='project-wrapper'>
      <h1 style={titleStyle}>{props.projectTitle}</h1>
      <table className='project-table'>
      <th align='start' onClick={()=>{setSort('name')}}>NAME</th>
      <th align='start' onClick={()=>{setSort('year')}}>YEAR</th>

      {
        projects.map(function(project, index){
          console.log(project.status)
          if(project.status === 'wip'){
            return(
            <tr className='project-single-element no-grab' onClick={()=>{alert('This project is in progress!')}}>
              <td>{project.title} <i>&#40;work in progress&#41;</i></td>
              <td>{project.year}</td>
            </tr>
          )
          }else if(project.status === "music"){
            <tr className='project-single-element music' onClick={()=>{goToProject(project)}}>
              <td>{project.title}</td>
              <td>{project.year}</td>
            </tr>
          }else if(project.status === "mus"){
            <tr className='project-single-element music' onClick={()=>{goToProject(project)}}>
              <td>{}</td>
              <td>{}</td>
            </tr>
          }
          else{
            return(
            <tr className='project-single-element' onClick={()=>{goToProject(project)}}>
              <td>{project.title}</td>
              <td>{project.year}</td>
            </tr>
          )
          }
          })
      }
      </table>
    </section>
    )
  }else{
    return(
      <section className='project-wrapper'>
        <h1 style={titleStyle}>{props.projectTitle}</h1>
        <table className='project-table'>
        <th align='start' onClick={() => sortState === 'name' ? setSort('name1') : setSort('name')}>NAME</th>
        <th align='start' onClick={() => sortState === 'year' ? setSort('scope1') : setSort('scope')}>Scope</th>
        <th align='start' onClick={() => sortState === 'type' ? setSort('type1') : setSort('type')}>PROJECT TYPE</th>
        <th align='start' onClick={() => sortState === 'year' ? setSort('year1') : setSort('year')}>YEAR</th>
        

        {
          projects.map(function(project, index){
            if(project.status === 'wip'){
              return(
              <tr className='project-single-element no-grab' onClick={()=>{alert('This project is in progress!')}}>
                <td>{project.title} <i>&#40;work in progress&#41;</i></td>
                <td>{project.scope}</td>
                <td>{project.type}</td>
                <td>{project.year}</td>
              </tr>
            )
            }else if (project.status === 'music'){
              return(
              <tr className='project-single-element music' onClick={()=>{goToProject(project)}}>
                <td>{project.title}</td>
                <td>{project.scope}</td>
                <td>{project.type}</td>
                <td>{project.year}</td>
              </tr>
            )
            }else if(project.status === "mus"){
              // 구분선
              return(
              <>
                <tr className='project-single-element no-grab'>
                  <td height={"15px"} ></td>
                </tr>

                <tr className='project-single-element music no-grab'>
              
                  <td  valign={"bottom"} align={"center"} colSpan={4}>
                    
                    <a
                      style={{textAlign:"justify", width:"100%",fontWeight: "bold", fontStyle: "italic"}} >
                      {"Music Project"}
                    </a>
                    
                  </td>
                  
                </tr>
              </>
              )
            }
            else{
              return(
              <tr className='project-single-element' onClick={()=>{goToProject(project)}}>
                <td>{project.title}</td>
                <td>{project.scope}</td>
                <td>{project.type}</td>
                <td>{project.year}</td>
              </tr>
            )
            }
            })
        }
        </table>
      </section>
    )
  }

  
}

function LeftSection(props){
  let className = 'section-style';

  if(props.mobile === 'true'){
    className = 'section-style-mo'
  }else{
    className = 'section-style'
  }

  let leftStyle = {
    borderRight : 'solid 1px black'
  }

  let value = useContext(StateContext);

  let [projectState, setProject] = useState('none');

  return(
    <section className={className} style={leftStyle}>
      <header className='header'><Link to={'/'} className='header-button' onClick={()=>{value.setStat('home')}}> 윤유상 (YOON YOOSANG) / 넙치 (NUPCHI) </Link></header>
      <ProjectWrapper mobile = {props.mobile} projectTitle='(WORKS)' projectSetter = {setProject}/>
      <footer className='footer'><a href='mailto:imflatfish01@gmail.com'> {"imflatfish01@gmail.com".toUpperCase()} </a></footer>
    </section>
  )
}

function RightSection(props){
  let introduction_en = ' HI! This is NUPCHI'
  let introduction_kr = '안녕하세요 넙치입니다.'

  let className = 'section-style';

  const value= useContext(StateContext);

  if(props.mobile === 'true'){
    className = 'section-style-mo'
  }else{
    className = 'section-style'
  }

  let imageStyle = {
    width : '350px',
    height : 'auto',
    marginTop : '20px'
  }

  //about PDF
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
  }
  function changePage(offset) {
      setPageNumber(prevPageNumber => prevPageNumber + offset);
    }
  
  let mediaWrapper = {
      // background: 'black',
      width : '100%',
      display : 'flex',
      flexDirection : 'column',
      justifyContent : 'center',
      alignItems : 'center',
      paddingTop : '20px',
      paddingBottom : '20px'
  }


  if(value.stat === 'about'){

    return(
      <section className={className}>
        <header className='header'><Link to={'/About'} className='header-button' onClick={()=>{value.setStat('about')}}>&#40;ABOUT&#41;</Link></header>
        <section className='about-wrapper about-text-style'>

          <div style = {mediaWrapper}>
            <img style={imageStyle} src={'https://github.com/soulmilk98/portfolio/blob/main/build/about_img/profile.png?raw=true'}/>
             <a href={"downloadlink"} target='_blank' rel='noreferrer' className='link' ><b>CV</b></a> <br/>
            <br/>
            <AboutPlainText text={introduction_en}/>
            <br/>
            <AboutPlainText text={introduction_kr}/>
            <br/>
            

          </div>

         
          <b>EDUCATION</b>
          <br/>
          <div>
          B.S. KAIST, Mechanical Engineering , Industrial Design (Double Major)
          <br/>
          M.S. KAIST, Industrial Design, <a href={"https://reflect9.github.io/ael/"} target='_blank' rel='noreferrer' className='link' >{"AI & Experience Lab"}</a><br/>

          </div>
          <br/>
          <b>CONTACT</b>
          <AboutLink href = {'mailto:imflatfish01@gmail.com'} text = {"imflatfish01@gmail.com".toUpperCase()}/>
          <AboutLink href = {'https://www.instagram.com/hogam_im_/'} text = {'IG. @윤유상'}/>
          <AboutLink href = {'https://www.instagram.com/flatfish01/'} text = {'IG. @넙치'}/>
          <br/>
          <div>
           

          </div>
        </section>
      </section>
    )
  }else if(value.stat === 'home'){
    return(
      <section className={className}>
        <header className='header'><Link to={'/About'} className='header-button' onClick={()=>{value.setStat('about')}}>&#40;ABOUT&#41;</Link></header>
        <div className='media-wrapper'>
          <img style={{width : '70%', marginTop: "10%", marginLeft:"20%"}} src={'https://github.com/soulmilk98/portfolio/blob/main/build/about_img/profile2.png?raw=true'}/>
        </div>
      </section>
  )}else if (value.stat === 'project' && value.selectedProject) {
    return (
      <section className={className}>
        <header className='header'><Link to={'/About'} className='header-button' onClick={()=>{value.setStat('about')}}>&#40;ABOUT&#41;</Link></header>
        <ProjectInfo project={value.selectedProject} />
      </section>
    );
  } else {
    return null; // Handle other cases or render nothing if state is undefined
  
  }

}

function MobileSection(props){
  let introduction_en = ' HI! This is NUPCHI'
  let introduction_kr = '안녕하세요 넙치입니다.'
  let school = 'B.S. Mechanical Engineering , Industrial Design(Double Major), KAIST / M.S. Industrial Design, KAIST'

  let className = 'section-style-mo'
  let value = useContext(StateContext)

  let [projectState, setProject] = useState('none');

  let imageStyle = {
    width : '250px',
    height : 'auto',
    marginTop : '20px'
  }

  if(value.stat === 'home'){
    return(
      <section className={className}>
        <header className='header'><Link to={'/'} className='header-button' onClick={()=>{value.setStat('home')}}>윤유상 (YOON YOOSANG) / 넙치 (NUPCHI) </Link><Link to={'/About'} className='header-button' onClick={()=>{value.setStat('about')}}>&#40;ABOUT&#41;</Link></header>
        <ProjectWrapper mobile = {props.mobile} projectTitle='(Works)' projectSetter = {setProject}/>
      </section>
  )
  }else if(value.stat === 'about'){
    return(
      <section className={className}>
        <header className='header'><Link to={'/'} className='header-button' onClick={()=>{value.setStat('home')}}>윤유상 (YOON YOOSANG) / 넙치 (NUPCHI) </Link><Link to={'/About'} className='header-button' onClick={()=>{value.setStat('about')}}>&#40;ABOUT&#41;</Link></header>
        <section className='about-wrapper about-text-style'>
        <AboutPlainText text={introduction_en}/>
          <br/>
          <AboutPlainText text={introduction_kr}/>
          <br/>

          <AboutPlainText text={'EDUCATION'}/>
          <div>
          B.S. KAIST, Mechanical Engineering , Industrial Design(Double Major)
          <br/>
          M.S. KAIST, Industrial Design, <a href={"https://reflect9.github.io/ael/"} target='_blank' rel='noreferrer' className='link' >{"AI & Experience Lab"}</a>
          </div>

          <br/>
          <AboutPlainText text={'CONTACT'}/>
          <AboutLink href = {'mailto:imflatfish01@gmail.com'} text = {"imflatfish01@gmail.com".toUpperCase()}/>
          <AboutLink href = {'https://www.instagram.com/hogam_im_/'} text = {'IG. @윤유상'}/>
          <AboutLink href = {'https://www.instagram.com/flatfish01/'} text = {'IG. @넙치'}/>
          <br/>
          <div>
            CV <a href={"downloadlink"} target='_blank' rel='noreferrer' className='link' >{"(Download)"}</a><br/>
          </div>
        </section>
      </section>
  )
  }else{
    return(
      <section className={className}>
        <header className='header'><Link to={'/'} className='header-button' onClick={()=>{value.setStat('home')}}>&#40;WORKS&#41;</Link><Link to={'/About'} className='header-button' onClick={()=>{value.setStat('about')}}>&#40;ABOUT&#41;</Link></header>
        <ProjectInfo mobile = {props.mobile} project = {value.stat}/>
      </section>
    )
  }
  
}

function App() {
  let [stat, setStat] = useState('home')
  const [selectedProject, setSelectedProject] = useState(null);

  const { pathParam } = useParams();
  console.log(pathParam)
  return (
    <StateContext.Provider value={{stat:stat, setStat:setStat, selectedProject, setSelectedProject}}>
      <BrowserRouter>
        <PC>
          <div className="App">
            <main className='main-section'>
              <LeftSection/>
              <RightSection/>
            </main>
          </div>
        </PC>
        <Mobile>
          <main className='main-section-mo'>
            <MobileSection mobile = 'true' />
          </main>
        </Mobile>
      </BrowserRouter>
    </StateContext.Provider>
  );
}

export default App;
