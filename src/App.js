import {useState} from 'react'
import {Formik, Form, Field} from 'formik';
import './header.css';
import './main.css';
import './article.css';

const App = () => {
  const [photos, setPhotos] = useState([]);

  const open = (url) => window.open(url);

  return (
    <div>
      <header>
        <Formik 
          initialValues={{search: ''}} 
          onSubmit={async (values) => {
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
              {
                headers: {
                  'Authorization': 'Client-ID E3DDQB1C2CIqryXfe6rGGZGgJSrVwzyaPfJ16Xx00aA'
                }
              });
              const data = await response.json();
              setPhotos(data.results);
        }}>
          <Form>
            <Field name='search' />
          </Form>
        </Formik>
      </header>
      <main>
        <div className='container'>
        {photos.map(photo => 
          <article key={photo.id} onClick={() => open(photo.links.html)}>
            <img src={photo.urls.regular} alt={photo.description}/>
            <p>{[photo.description, photo.alt_description].join(' - ')}</p>
          </article>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
