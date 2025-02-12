import { useState } from "react";
import { useNavigate, Link  } from "react-router-dom"
import axios from 'axios';

export default function AddProduct(props) {
    // use props to find the next item's id
    const newProductId = props.props[props.props.length-1].id + 1;
    // console.log(newProductId);

    //use history to redirect
    let navigateTo = useNavigate();

    //template object to save form data
    let templateObj = {
        id: newProductId,
        name: "",
        price: 0,
        images: {},
        descriptionShort: "",
        sizes: [{
            "xSmall":false,
            "small":false,
            "medium":false,
            "large":false,
            "xLarge":false
        }],
        colors: [{"colorName": ""}],            
        descriptionLong: "",            
        additionalDetails: [{
            "materials": "",
            "recommendedFor": "",
            "madeIn": "",
            "care": "",
            "shipping": "Worldwide Flat Rate Shipping"
        }],            
        type: "",            
        materials: [{
            "material1": ""
        }],
        promotion: 0,
        stock: 0
    };

    //states
    const [formData, setFormData] = useState(templateObj);

    //handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name] : value});
    };

    const handleCheck = (e) => {
        const { checked } = e.target;
        let property = e.target.name;
        setFormData({
            ...formData,
            sizes: [{
                ...formData.sizes[0],
                 [property]: checked
            }]
        });
    }

    const setColors = (e) => {
        const color = e.target.value;
        setFormData({
            ...formData,
            colors: [{
                ["colorName"] : color
            }]
        });
    };

    const changeAdditional = (e) => {
        let property = e.target.name;
        let addDet = formData.additionalDetails[0];
        let value = e.target.value;

        setFormData({
            ...formData,
            additionalDetails: [{
                ...addDet,
                [property]: value
            }]
        });
    }

    const setMaterials = (e) => {
        const material = e.target.value;
        setFormData({
            ...formData,
            materials: [{
                ["material1"] : material
            }]
        });
    };

    //once submitted use axios and server method to add the form to mongodb
    const submitFunction = async (e) => {
        e.preventDefault();
        
        setFormData({
            ...formData,
            id: newProductId
        })
        try {
            const response = await axios.post('http://localhost:8888/addProduct', formData);
            console.log('Form data submitted', response.data);
            navigateTo('/admin/list-products');
            navigateTo(0);
        } catch (err) {
            console.error("Error", err);
        };
    }

    return(
        <div className="row">
            <div className="col"></div>
            <div className="col-8 text-start">
                <div className="row my-3">
                    <div className="col-2">
                        <button type="button" className="btn btn-secondary" onClick={() => navigateTo(-1)}>Back</button>
                    </div>
                </div>
                <h1 className="my-3">Add Product</h1>
                <form action="post" onSubmit={submitFunction}>
                    <input type="hidden" id="id" name="id" value={newProductId} />
                    <h3>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="name">Name: </label>
                            </div>
                            <div className="col">
                                <input type="text" id="name" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} />
                            </div>
                        </div>
                    </h3>
                    <h3>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="price">Price: </label>
                            </div>
                            <div className="col">
                                <input type="number" id="price" name="price" placeholder="00.00" value={formData.price} onChange={handleChange} min="0.01" step=".01" />
                            </div>
                        </div>
                    </h3>
                    <h3>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="descriptionShort">Short Description: </label>
                            </div>
                            <div className="col">
                                <textarea name="descriptionShort" id="descriptionShort" placeholder="Enter Short Description Here" value={formData.descriptionShort} onChange={handleChange}></textarea>
                            </div>
                        </div>
                    </h3>                    
                    <div className="row">
                        <div className="col">
                            <h3>
                                <label htmlFor="sizes">Sizes:</label>
                            </h3>
                        </div>
                        <div className="col">
                            <h5>
                                <input type="checkbox" id="xSmall" name="xSmall" onChange={handleCheck}/>
                                <label htmlFor="xSmall">XSmall</label>
                            </h5>
                        </div>
                        <div className="col">
                            <h5>
                                <input type="checkbox" id="small" name="small" onChange={handleCheck}/>
                                <label htmlFor="small">small</label>
                            </h5>
                        </div>
                        <div className="col">
                            <h5>
                                <input type="checkbox" id="medium" name="medium" onChange={handleCheck}/>
                                <label htmlFor="medium">medium</label>
                            </h5>
                        </div>
                        <div className="col">
                            <h5>
                                <input type="checkbox" id="large" name="large" onChange={handleCheck}/>
                                <label htmlFor="large">large</label>
                            </h5>
                        </div>
                        <div className="col">
                            <h5>
                                <input type="checkbox" id="xLarge" name="xLarge" onChange={handleCheck}/>
                                <label htmlFor="xLarge">XLarge</label>
                            </h5>
                        </div>
                    </div>
                    <h3>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="name">Colors: </label>
                            </div>
                            <div className="col">
                                <input type="text" id="colors" name="colors" placeholder="Color" value={formData.colors.colorName} onChange={setColors} />
                            </div>
                        </div>
                    </h3>                
                    <h3>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="descriptionLong">Long Description: </label>
                            </div>
                            <div className="col">
                                <textarea name="descriptionLong" id="descriptionLong" placeholder="Enter Long Description Here" value={formData.descriptionLong} onChange={handleChange}></textarea>
                            </div>
                        </div>
                    </h3> 
                    <h3 className="mt-5 mb-3">
                        <div className="row">
                            <label htmlFor="additionalDetails">Additional Labels: </label>
                        </div> 
                    </h3>  
                    <h3>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="materials">Materials: </label>
                            </div>
                            <div className="col">
                                <input type="text" id="materials" name="materials" placeholder="Materials..." onChange={changeAdditional} />
                            </div>                            
                        </div>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="recommendedFor">Recommended For: </label>
                            </div>
                            <div className="col">
                                <input type="text" id="recommendedFor" name="recommendedFor" placeholder="Recommended For..." onChange={changeAdditional} />
                            </div>                            
                        </div>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="madeIn">Made In: </label>
                            </div>
                            <div className="col">
                                <input type="text" id="madeIn" name="madeIn" placeholder="Made In..." onChange={changeAdditional} />
                            </div>                            
                        </div>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="care">Care Details: </label>
                            </div>
                            <div className="col">
                                <input type="text" id="care" name="care" placeholder="Care Details..." onChange={changeAdditional} />
                            </div>                            
                        </div>
                    </h3>
                    <h3>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="type">Type: </label>
                            </div>
                            <div className="col">
                                <input type="text" id="type" name="type" placeholder="Type" value={formData.type} onChange={handleChange} />
                            </div>
                        </div>
                    </h3>
                    <h3>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="materials">Materials: </label>
                            </div>
                            <div className="col">
                                <input type="text" id="materials" name="materials" placeholder="Materials..." value={formData.materials.material1} onChange={setMaterials} />
                            </div>
                        </div>
                    </h3>
                    <h3>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="promotion">Promotion: </label>
                            </div>
                            <div className="col">
                                <input type="number" id="promotion" name="promotion" placeholder="Promotion" value={formData.promotion} onChange={handleChange} />
                            </div>
                        </div>
                    </h3>
                    <h3>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="stock">Stock: </label>
                            </div>
                            <div className="col">
                                <input type="number" id="stock" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} />
                            </div>
                        </div>
                    </h3>

                    <button type="submit" className="btn btn-primary">Add Product</button>
                </form>
            </div>
            <div className="col"></div>
        </div>
    )
}