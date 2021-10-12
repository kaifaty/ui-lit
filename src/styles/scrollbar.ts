import { css } from 'lit';
export const scrollbar = css`
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: var(--scrollbar-track, #f1f1f1);
}
::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb, #888);;
}
:host, .ff-scrollbar{  
  scrollbar-color: var(--scrollbar-thumb, #888) var(--scrollbar-track, #f1f1f1) ;
  scrollbar-width: thin;
}
`;