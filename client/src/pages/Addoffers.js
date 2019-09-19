import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Dropzone from 'react-dropzone'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import axios from 'axios'
import { config } from '../utils/offers/Offers'
import Loader from 'react-loader-spinner'
import { useAlert } from 'react-alert'
import uuid from 'uuid'

function Addoffers() {
  const alert = useAlert()
  // component states
  const [images, setImages] = useState([])
  const [title, setTitle] = useState('')
  const [overview, setOverview] = useState('')
  const [itinerary, setItinerary] = useState('')
  const [inclusion, setInclusion] = useState('')
  const [price, setPrice] = useState('')
  const [addinfo, setAddinfo] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/lostvane/image/upload'
  const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

  const imagesArray = []

  const handleDrop = files => {
    const formData = new FormData()
    files.map(file => {
      formData.append('file', file)
      formData.append('upload_preset', UPLOAD_PRESET)

      setIsUploading(true)

      fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          imagesArray.push(data.secure_url)
          setIsUploading(false)
          setImages(imagesArray)
        })
        .catch(error => {
          setIsUploading(false)
          console.log(error)
        })
    })
  }

  // onsubmit function
  const handleSubmit = e => {
    e.preventDefault()
    setIsLoading(true)
    // add method to send data to the backend
    const details = {
      images,
      title,
      overview,
      itinerary,
      inclusion,
      price,
      addinfo
    }
    axios
      .post('/api/addoffer', details, config)
      .then(res => {
        setIsLoading(false)
        alert.success(res.data.message)
      })
      .catch(error => {
        setIsLoading(false)
        alert.error('something went wrong, try again')
        console.log(error)
      })
  }

  const uploadProgress = isUploading ? (
    <div>
      <Loader type='ThreeDots' color='blue' height={45} width={45} />
      <span role='img' aria-label='uploading'>
        uploading...⏳
      </span>
    </div>
  ) : (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly'
      }}>
      {images.length !== 0 ? (
        images.map(image => (
          <div
            key={uuid.v4()}
            style={{
              height: '50%',
              width: '50%'
            }}>
            <img
              src={image}
              alt='myimages'
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
        ))
      ) : (
        <div>drag 'n drop or click to upload your images</div>
      )}
    </div>
  )

  return (
    <div className='addoffers--container'>
      <Sidebar></Sidebar>
      <div className='offers--wrapper'>
        <div className='form--content'>
          <form action='' method='POST' className='offers--form'>
            <h4>Create your new offer</h4>
            <div className='form--group'>
              <label htmlFor='images'>Images</label>
              <Dropzone onDrop={handleDrop}>
                {({ getRootProps, getInputProps }) => (
                  <section
                    style={{
                      height: '10rem',
                      width: '100%',
                      border: '1px solid #bbbbbb',
                      borderRadius: '3px'
                    }}>
                    <div
                      {...getRootProps()}
                      style={{
                        height: '100%',
                        width: '100%',
                        padding: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <input {...getInputProps()} />
                      {uploadProgress}
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
            <div className='form--group'>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                name='title'
                value={title}
                id='title'
                className='form--control'
                placeholder='title'
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div className='form--group'>
              <label htmlFor='title'>Overview</label>
              <div className='editor--div' style={{ width: '100%' }}>
                <CKEditor
                  editor={ClassicEditor}
                  data={overview}
                  onInit={editor => {
                    // You can store the "editor" and use when it is needed.
                    return true
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData()
                    setOverview(data)
                  }}
                />
              </div>
            </div>
            <div className='form--group'>
              <label htmlFor='title'>Itinerary</label>
              <div className='editor--div' style={{ width: '100%' }}>
                <CKEditor
                  editor={ClassicEditor}
                  data={itinerary}
                  onInit={editor => {
                    // You can store the "editor" and use when it is needed.
                    return true
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData()
                    setItinerary(data)
                  }}
                />
              </div>
            </div>
            <div className='form--group'>
              <label htmlFor='title'>Inclusion</label>
              <div className='editor--div' style={{ width: '100%' }}>
                <CKEditor
                  editor={ClassicEditor}
                  data={inclusion}
                  onInit={editor => {
                    // You can store the "editor" and use when it is needed.
                    return true
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData()
                    setInclusion(data)
                  }}
                />
              </div>
            </div>
            <div className='form--group'>
              <label htmlFor='title'>Price</label>
              <div className='editor--div' style={{ width: '100%' }}>
                <CKEditor
                  editor={ClassicEditor}
                  data={price}
                  onInit={editor => {
                    // You can store the "editor" and use when it is needed.
                    return true
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData()
                    setPrice(data)
                  }}
                />
              </div>
            </div>
            <div className='form--group'>
              <label htmlFor='title'>Additional information</label>
              <div className='editor--div' style={{ width: '100%' }}>
                <CKEditor
                  editor={ClassicEditor}
                  data={addinfo}
                  onInit={editor => {
                    // You can store the "editor" and use when it is needed.
                    return true
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData()
                    setAddinfo(data)
                  }}
                />
              </div>
            </div>
          </form>
          <button
            type='submit'
            onClick={handleSubmit}
            className='btn btn--offer'>
            {isLoading ? (
              <span>
                <Loader
                  type='ThreeDots'
                  color='#fff'
                  height={45}
                  width={45}></Loader>
              </span>
            ) : (
              <span>CREATE OFFER</span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Addoffers
