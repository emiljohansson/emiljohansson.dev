import styled from 'styled-components'

export default styled.section<{
  direction?: string
}>`
  background-color: transparent;
  border: 0;
  display: flex;
  align-items: center;
  flex: 1;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: center;
  font-size: 3rem;
  height: 100%;
  outline: none;
  overflow: auto;
  font-variant-numeric: tabular-nums;
`
