import React, { Component, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import axios from "../../axios";
import { setModal } from "../../store/actions/uiActions";
import {
  fetchPlaylistsMenu,
  updatePlaylist
} from "../../store/actions/playlistActions";

import "./modal.css";
import song from "../../containers/mainSection/images/song.png";
import meomeo from "../../utilities/ass/meomeo.jpg";

const modal = () => {
  const modal = useSelector(state => state.ui.modal);
  console.log(modal);
  const [title, setTitle] = useState("Tên danh sách");
  const [description, setDescriptione] = useState("Mô tả");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  return (
    <div>
      <div className={`playlist-Modal ${modal? "active" : ""}`}>
        <div className="modal-content">
          <div className="modal-title">
            <h4>Tạo mới danh sách bài hát</h4>
          </div>
          <div className="modal-body">
            <div className="title-input">
              <span>Tên</span>
              <input
                value={title}
                onChange={event => setTitle(event.target.value)}
                placeholder="Playlist name"
                maxLength="100"
              />
              <div className="counter">{`${title.length}/100`}</div>
              <div className="description">
                <div className="image">
                  <span>Image</span> <img alt="song" src={meomeo} />
                </div>
                <div className="text">
                  <span>Description</span>
                  <div className="counter">{`${description.length}/300`}</div>
                  <textarea
                    value={description}
                    onChange={event => setDescriptione(event.target.value)}
                    placeholder="Give your playlist a catchy description."
                    maxLength="300"
                  />
                </div>
              </div>
              <div className={`error-message ${error ? "active" : ""}`}>
                <i className="fa fa-exclamation" aria-hidden="true" />
                <span>You must give your playlist a name.</span>
              </div>
              <div className="btn-section">
                <button
                  className="cancel-btn"
                  onClick={() => {
                    dispatch(setModal(false));
                  }}
                >
                  Cancel
                </button>
                <button className="save-btn">
              {/* onClick={edit ? this.onSubmitPlaylist : this.onSubmitNew}
                  {this.state.btn} */}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`overlay ${modal ? "active" : ""}`}
        onClick={() => {
          dispatch(setModal(false));
        }}
      />
    </div>
  );
};

export default modal;

// class Modal extends Component {
//   state = {};

//   componentWillMount() {
//     this.initialize();
//   }

//   componentDidUpdate(prevProps) {
//     if (prevProps !== this.props && this.props.show) {
//       this.initialize();
//     }
//   }

//   initialize = () => {
//     if (this.props.edit) {
//       this.setState({
//         header: 'Edit Playlist Details',
//         title: this.props.playlist.name || '',
//         description: this.props.playlist.description || '',
//         image: this.props.playlist.images.length
//           ? this.props.playlist.images[0].url
//           : song,
//         btn: 'Save',
//         error: false
//       });
//     } else {
//       this.setState({
//         header: 'Create Playlist',
//         title: 'New Playlist',
//         description: '',
//         image: song,
//         btn: 'Create',
//         error: false
//       });
//     }
//   };

//   handleChange = (input, event) => {
//     input === 'title'
//       ? this.setState({ title: event.target.value })
//       : this.setState({ description: event.target.value });
//   };

//   validate = () => {
//     const title = this.state.title;
//     if (!title.replace(/\s/g, '').length) {
//       this.setState({ error: true });
//       return false;
//     }
//     return true;
//   };

//   onCancel = () => {
//     this.initialize();
//     this.props.setModal(false);
//   };

//   onSubmitNew = () => {
//     if (this.validate()) {
//       axios
//         .post(`/users/${this.props.id}/playlists`, {
//           name: this.state.title,
//           description: this.state.description
//         })
//         .then(() => {
//           this.props.setModal(false);
//           this.props.fetchPlaylistsMenu();
//         });
//     }
//   };

//   onSubmitPlaylist = () => {
//     const changeTitle = this.props.playlist.name !== this.state.title;
//     const changeDescription =
//       this.props.playlist.description !== this.state.description;

//     if (!changeTitle && !changeDescription) {
//       return;
//     }

//     let playlist = {};
//     if (changeTitle) {
//       playlist.name = this.state.title;
//     }
//     if (this.state.description && changeDescription) {
//       playlist.description = this.state.description;
//     }

//     if (this.validate()) {
//       axios.put(`/playlists/${this.props.playlist.id}`, playlist).then(() => {
//         this.props.setModal(false);
//         this.props.updatePlaylist(playlist);
//         if (changeTitle) {
//           this.props.fetchPlaylistsMenu();
//         }
//       });
//     }
//   };

//   render() {
//     const edit = this.props.edit;
//     return (

//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     fetching: state.playlistReducer.fetchPlaylistPending,
//     playlist: state.playlistReducer.playlist || { images: [] },
//     show: state.uiReducer.modal,
//     edit: state.uiReducer.mode !== 'new',
//     id: state.userReducer.user.id
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//     {
//       setModal,
//       fetchPlaylistsMenu,
//       updatePlaylist
//     },
//     dispatch
//   );
// };
// // export default connect(
// //   mapStateToProps,
// //   mapDispatchToProps
// // )(Modal);

// export default Modal
