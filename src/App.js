import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtrack, fetchTrack } from "./redux-toolkit/slices/trackSlice";
import Spinner from "./components/spinner/spinner";
import LeftSection from "./containers/leftSection/leftSection";
import MainSection from "./containers/mainSection/mainSection";
import RightSection from "./containers/rightSection/rightSection";
import { setToken, fetchUser } from "./store/actions/sessionActions";
import { fetchAudio } from "./redux-toolkit/slices/audioSlice";
import "./App.css";

// function component
const App = () => {
  const dispatch = useDispatch();
  const track = useSelector(state => state.track.value);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(fetchTrack("cd715b8b-85dd-40a3-9628-85fb1c776a26"));
    setLoading(false); // nếu như loading bằng true thì spinner sẽ chạy
  }, []);

  // fetch file luu vao state
  useEffect(
    () => {
      if (track.id !== undefined) {
        dispatch(fetchAudio(track.id));
      }
    },
    [track]
  );

  return (
      <div className="app">
        <Spinner loading={loading}>
          <LeftSection />
          <MainSection />
          <RightSection />
        </Spinner>
      </div>
  );
};

export default App;

// class App extends Component {
//   state = {
//     // playerLoaded: false
//   };

//   componentDidMount() {
//     const token = Login.getToken();
//     if (!token) {
//       Login.logInWithSpotify();
//     } else {
//       this.setState({ token: token });
//       this.props.setToken(token);
//       this.props.fetchUser();
//     }
//   }

//   render() {
//     const dispatch = useDispatch();
//     // let webPlaybackSdkProps = {
//     //   playerName: 'Spotify React Player',
//     //   playerInitialVolume: 1.0,
//     //   playerRefreshRateMs: 1000,
//     //   playerAutoConnect: true,
//     //   onPlayerRequestAccessToken: () => this.state.token,
//     //   onPlayerLoading: () => {},
//     //   onPlayerWaitingForDevice: () => {
//     //     this.setState({ playerLoaded: true });
//     //   },
//     //   onPlayerError: e => {
//     //     console.log(e);
//     //   },
//     //   onPlayerDeviceSelected: () => {
//     //     this.setState({ playerLoaded: true });
//     //   }
//     // };
//     return (
//       <div className="app">
//         {/* <WebPlaybackReact {...webPlaybackSdkProps}> */}
//           <Spinner loading={this.state.playerLoaded}>
//             <LeftSection />
//             <MainSection />
//             <RightSection />
//           </Spinner>
//         {/* </WebPlaybackReact> */}
//       </div>
//     );
//   }
// }

// export default App

// // const mapStateToProps = state => {
// //   return {
// //     token: state.sessionReducer.token
// //   };
// // };

// // const mapDispatchToProps = dispatch => ({
// //   setToken: token => dispatch(setToken(token)),
// //   fetchUser: () => dispatch(fetchUser())
// // });

// // export default connect(
// //   mapStateToProps,
// //   mapDispatchToProps
// // )(App);
