import { css } from 'lit';
export const scrollbar = css`
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: var(--lit-scrollbar-track, #f1f1f1);
}
::-webkit-scrollbar-thumb {
  background: var(--lit-scrollbar-thumb, #888);;
}
:host, .ff-scrollbar{  
  scrollbar-color: var(--lit-scrollbar-thumb, #888) var(--lit-scrollbar-track, #f1f1f1) ;
  scrollbar-width: thin;
}
`;