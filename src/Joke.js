import React, {Component} from "react";

class Joke extends Component {
  state={
    Joke: {},
    isLoading: false
  }
  getJoke = async (category)=>{
    this.setState({
      isLoading : true
    })
    const fetchJoke = await fetch(`https://official-joke-api.appspot.com/jokes/${category}/random`);
    const resolveJoke = await fetchJoke.json();

    this.setState({
      Joke: resolveJoke[0],
      isLoading: false
    })

  }

  componentDidMount =()=> this.getJoke(this.props.category);
  componentDidUpdate = prevProps =>{
    if(this.props.category !== prevProps.category){
      this.getJoke(this.props.category);
    }
  }

  render() {
    return (
      <>
        <div className={this.state.isLoading ? "title title-pulse": "title"} onClick={()=>this.getJoke(this.props.category)}>Get Joke </div>
        <div className="joke-panel">
          <div className="joke-setup">{this.state.Joke.setup}</div>
          <div className="joke-punchline">{this.state.Joke.punchline}</div>
        </div>
      </>
    );
  }
}

export default Joke;
