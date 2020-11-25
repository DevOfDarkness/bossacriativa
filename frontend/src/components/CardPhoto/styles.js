import styled from 'styled-components';

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  background-color: #ddd;
  margin-top: 30px;
`;

export const Body = styled.main`
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;

  figure {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 0;

    img {
      flex: 1;
      background-color: #555;
      width: 100%;
    }

    div {
      height: 30px;
      padding-left: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    figcaption {
      text-align: left;
      font-size: .8em;
    }
    
    button {
      height: 30px;
      width: 30px;
      background-color: #bbb;
      outline: none;
      border: 0;
    }
  }
`;

export const Info = styled.div`
  background-color: rgba(255, 255, 255, .8);
  height: calc(100% - 30px);
  width: 100%;
  position: absolute;
  bottom: 30px;
  opacity: 0;
  transition: opacity .3s linear;

  > p {
    margin: 5px;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;
  }

  &.show {
    opacity: 1;
  }
`;