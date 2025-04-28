# Section 17 - Lecture 206:

1. Install React Router library:
```js
npm install react-router-dom
```

2. Add the Routers in `App.jsx` file:
```js
<BrowserRouter>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />
        <Route path="*" element={<PageNotFound />} />
    </Routes>  
</BrowserRouter>
```

3. Better add `<Link></Link>` than `<a></a>`, so it would be something as follows: 
```js
<Link to="/pricing">Pricing</Link>
``` 