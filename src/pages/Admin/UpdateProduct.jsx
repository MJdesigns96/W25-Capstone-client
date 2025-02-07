import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateProduct(props) {
    // get the prop and id details then set state to that prop
    const { productId } = useParams();
    let productList = props.props;
    let chosenProduct;

    //use history to redirect
    let navigateTo = useNavigate();

    productList.map(entry => {
        if (entry.id == productId) {
            chosenProduct = entry;
        }
    });

    const [product, setProduct] = useState(chosenProduct);
    // console.log(product);

    //handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name] : value});
    };

    const handleCheck = (e) => {
        const { checked } = e.target;
        let property = e.target.name;
        setProduct({
            ...product,
            sizes: [{
                ...product.sizes[0],
                 [property]: checked
            }]
        });
    }

    const setColors = (e) => {
        const color = e.target.value;
        setProduct({
            ...product,
            colors: [{
                ["colorName"] : color
            }]
        });
    };

    const changeAdditional = (e) => {
        let property = e.target.name;
        let addDet = product.additionalDetails[0];
        let value = e.target.value;

        setProduct({
            ...product,
            additionalDetails: [{
                ...addDet,
                [property]: value
            }]
        });
    }

    const setMaterials = (e) => {
        const material = e.target.value;
        setProduct({
            ...product,
            materials: [{
                ["material1"] : material
            }]
        });
    };

    //once submitted use axios and server method to add the form to mongodb
    const submitFunction = async (e) => {
        e.preventDefault();

        if (typeof(product.price) === "string" || typeof(product.stock) === "string" || typeof(product.promotion) === "string") {
            setProduct({
                ...product,
                price : Number(product.price),
                stock : Number(product.stock),
                promotion : Number(product.promotion)
            })
        }

        try {
            const response = await axios.post('http://localhost:8888/updateProduct', product);
            console.log('Form data submitted', response.data);
            navigateTo('/admin/list-products');
            navigateTo(0);
        } catch (err) {
            console.error("Error", err);
        };
    }

    return (
        <>
            <div className="row">
            <div className="col"></div>
            <div className="col-8 text-start">
                <div className="row my-3">
                    <div className="col-2">
                        <button type="button" className="btn btn-secondary" onClick={() => navigateTo(-1)}>Back</button>
                    </div>
                </div>
                <h1 className="my-3">Update </h1>
                <form action="post" onSubmit={submitFunction}>
                    <input type="hidden" id="id" name="id" value={productId} />
                    <h3>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="name">Name: </label>
                            </div>
                            <div className="col">
                                <input type="text" id="name" name="name" value={product.name} onChange={handleChange} />
                            </div>
                        </div>
                    </h3>
                    <h3>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="price">Price: </label>
                            </div>
                            <div className="col">
                                <input type="number" id="price" name="price" value={product.price} onChange={handleChange} min="0.01" step=".01" />
                            </div>
                        </div>
                    </h3>
                    <h3>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="descriptionShort">Short Description: </label>
                            </div>
                            <div className="col">
                                <textarea name="descriptionShort" id="descriptionShort" value={product.descriptionShort} onChange={handleChange}></textarea>
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
                                <input type="text" id="colors" name="colors" value={product.colors[0].colorName} onChange={setColors} />
                            </div>
                        </div>
                    </h3>                
                    <h3>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="descriptionLong">Long Description: </label>
                            </div>
                            <div className="col">
                                <textarea name="descriptionLong" id="descriptionLong"  value={product.descriptionLong} onChange={handleChange}></textarea>
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
                                <input type="text" id="materials" name="materials" value={product.additionalDetails[0].materials} onChange={changeAdditional} />
                            </div>                            
                        </div>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="recommendedFor">Recommended For: </label>
                            </div>
                            <div className="col">
                                <input type="text" id="recommendedFor" name="recommendedFor" value={product.additionalDetails[0].recommendedFor} onChange={changeAdditional} />
                            </div>                            
                        </div>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="madeIn">Made In: </label>
                            </div>
                            <div className="col">
                                <input type="text" id="madeIn" name="madeIn" value={product.additionalDetails[0].madeIn}  onChange={changeAdditional} />
                            </div>                            
                        </div>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="care">Care Details: </label>
                            </div>
                            <div className="col">
                                <input type="text" id="care" name="care" value={product.additionalDetails[0].care} onChange={changeAdditional} />
                            </div>                            
                        </div>
                    </h3>
                    <h3>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="type">Type: </label>
                            </div>
                            <div className="col">
                                <input type="text" id="type" name="type" value={product.type} onChange={handleChange} />
                            </div>
                        </div>
                    </h3>
                    <h3>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="materials">Materials: </label>
                            </div>
                            <div className="col">
                                <input type="text" id="materials" name="materials" value={product.materials[0].material1} onChange={setMaterials} />
                            </div>
                        </div>
                    </h3>
                    <h3>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="promotion">Promotion: </label>
                            </div>
                            <div className="col">
                                <input type="number" id="promotion" name="promotion" value={product.promotion} onChange={handleChange} />
                            </div>
                        </div>
                    </h3>
                    <h3>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="stock">Stock: </label>
                            </div>
                            <div className="col">
                                <input type="number" id="stock" name="stock" value={product.stock} onChange={handleChange} />
                            </div>
                        </div>
                    </h3>

                    <button type="submit" className="btn btn-primary">Update Product</button>
                </form>
            </div>
            <div className="col"></div>
        </div>
        </>
    )
}