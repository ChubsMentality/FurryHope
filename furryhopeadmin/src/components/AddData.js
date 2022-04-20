import React, { useState, useEffect } from 'react'
import '../css/AddData.css'
import { useDispatch, useSelector} from 'react-redux'
import { createAnimalAction } from '../actions/animalActions'
import { css } from '@emotion/css'
import axios from 'axios'
import ClipLoader from 'react-spinners/ClipLoader'
import Sidebar from './Sidebar'

// There's a tutorial on how to upload an image to the database
// Just use bootstrap's built-in form for file upload
// MERN stack (roadsider) - 58:09 # 10

const override = css`
    display: block;
    border-color: white;
    margin-top: 5px;
    margin-left: auto;
    margin-right: auto;
`

const AddData = () => {
    const dispatch = useDispatch();
    const animalCreate = useSelector((state) => state.animalCreate);
    const { loading, error } = animalCreate

    // loading state
    const [spinnrColor] = useState('#111111')

    const [name, setName] = useState('');
    const [breed, setBreed] = useState('Unknown / Unidentified');
    const [description, setDescription] = useState('No description was given about the animal.');
    const [color, setColor] = useState('')
    const [gender, setGender] = useState('');
    const [animalType, setAnimalType] = useState('');
    const [selectedImg, setSelectedImg] = useState('https://res.cloudinary.com/drvd7jh0b/image/upload/v1640256598/hyr5slabmcd9zf8xddrv.png');
    const adoptionStatus = 'Not Adopted'

    // Function to upload the image to cloudinary
    const uploadImg = (selectedImg) => {
        if(selectedImg.type === 'image/jpeg' || selectedImg.type === 'image/png') {
            const data = new FormData()
            data.append('file', selectedImg)
            data.append('upload_preset', 'furryhopeimg')
            data.append('cloud_name', 'drvd7jh0b')
            fetch('https://api.cloudinary.com/v1_1/drvd7jh0b/image/upload', {
                method: 'post',
                body: data
            })
                .then((res) => res.json())
                .then((data) => {
                console.log(data)
                setSelectedImg(data.url.toString()) // gives us the url of the image in the cloud
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            alert('Please select an image')
        }
    }

    // This block of code is essential to send push notifications in the mobile app
    const [currentCount, setCurrentCount] = useState(Number)
    useEffect(() => {
        const getCurrentCount = async () => {
            const { data } = await axios.get('http://localhost:5000/api/animals/totalCount')
            console.log(data.currentCount)
            setCurrentCount(data.currentCount + 1)
            console.log('Count to be passed: ', currentCount)
        }

        getCurrentCount()

        const interval = setInterval(() => {
            getCurrentCount()
        }, 30000)

        return () => clearInterval(interval)
    }, [currentCount])

    const updateTotalCount = () => {
        console.log(`Count to be passed: ${currentCount}`)
        axios.put('http://localhost:5000/api/animals/updateCount', { currentCount })
            .then((response) => {
                console.log(response)
            })
            .catch(error => console.log(error))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if(!name || !breed || !description || !color || !gender || !animalType || !selectedImg || !adoptionStatus) return;
        dispatch(createAnimalAction(name, color, breed, description, gender, animalType, selectedImg, adoptionStatus));
        alert('Successfully Added to the Database!');
        setName('')
        setBreed('Unknown / Unidentified')
        setDescription('No description was given about the animal.')
        setColor('')
        setGender('')
        setAnimalType('')
        setSelectedImg('https://res.cloudinary.com/drvd7jh0b/image/upload/v1640256598/hyr5slabmcd9zf8xddrv.png')

        updateTotalCount()
    }

    return (
        <div className="addData-body">
            <Sidebar />
            <div className='content'>
                {error && window.alert(error)}
                <p className='add-data-header'>ADD A NEW ANIMAL</p>
                <form className="addData-form-container" onSubmit={submitHandler}>
                    <div className='addData-form-left-column'>
                        <label htmlFor="name" className="lbl-name lbl-add">Name</label><br />
                        <input type="text" name="name" className="addName input-add-data" required value={name} onChange={(e) => setName(e.target.value)}/><br />

                        <br />

                        <label htmlFor="breed" className="lbl-breed lbl-add">Breed</label><br />
                        <input type="text" name="breed" className="addBreed input-add-data" value={breed} onChange={(e) => setBreed(e.target.value)}/><br />

                        <br />

                        <label htmlFor="desc" className="lbl-breed lbl-add">Description (optional)</label><br />
                        <textarea name="desc" className="addDesc" value={description} onChange={(e) => setDescription(e.target.value)}></textarea><br />

                        <br />

                        <label htmlFor="color" className='lbl-color lbl-add'>Color</label><br />
                        <input type="text" name="color" className="addColor" value={color} onChange={(e) => setColor(e.target.value)} /><br />

                        <br />

                        <label htmlFor="select" className="lbl-select lbl-add">Gender</label>
                        <select className="select" name="select" required value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="" defaultValue>Select here</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>

                        <br />

                        <label htmlFor="select" className="lbl-select lbl-add">Animal Type</label>
                        <select className="select-animal-type" name="select" required value={animalType} onChange={(e) => setAnimalType(e.target.value)}>
                            <option value="" defaultValue>Select here</option>
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                        </select>

                        <br />
                    </div>
                    <div className='addData-form-right-column'>
                        <div className="add-data-imgUploadContainer">
                            <label htmlFor="imgUpload" className="lbl-imgUpload lbl-add">Image Upload</label>
                            <input type="file" className="add-data-imgUpload" name="imgUpload" onChange={(e) => uploadImg(e.target.files[0])} />
                        </div>

                        <p className='add-data-preview-txt'>Preview</p>
                        <br />
                        <img src={selectedImg} className='add-data-imgUpload-preview' />
                        <br />
                        <button className="btn-add" >{loading ? <ClipLoader color={spinnrColor} css={override} loading={loading} size={35} /> : <p className='add-data-text'>SUBMIT</p>}</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default AddData;

/*
<div className="imgUploadContainer">
                    <label htmlFor="imgUpload" className="lbl-imgUpload lbl-add">Image Upload</label><br />
                    <input type="file" className="imgUpload" name="imgUpload" onChange={(e) => uploadImg(e.target.files[0])} />
                </div>
*/