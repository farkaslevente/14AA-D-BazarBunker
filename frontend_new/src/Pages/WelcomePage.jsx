import React from 'react'
import './CSS/WelcomePage.css'

export const WelcomePage = () => {
  return (
    <div className='welcomepage'>
      <div className="container">
        <h1 className='title'>Végeztél az iskolával? - Vagy éppen most kezded?</h1>
        <div className="description">
          <p>A <b><i>BAZÁRBUNKER</i>&trade;</b> azért jött létre, hogy mindenki számára megkönnyítse és olcsóbbá tegye az iskolát.</p>
          <p>Ha nem bánod az esetleges használt cuccokat, akkor <b>ITT</b> a helyed, nézz körül, és spórolj!</p>
          <p>Legyen szó színes ceruza készletről, köteleő olvasmányokról, tankönyvekről, akár íróasztalról is, itt könnyedén megtalálhatod!</p>
        </div>
      </div>
    </div>
  )
}
