import React, { useRef, useState, useEffect } from "react"
import styled from "styled-components"
import { gsap } from "gsap"
import { Link as GatsbyLink } from "gatsby"
import { navItemsData } from "../../data/navItems"

const StyledNavWrapper = styled.div`
  display: flex;
  @media (max-width: 1024px) {
    height: 0;
    width: 100%;
    background: ${props => props.theme.colors.light};
    position: relative;
    @media (min-width: 520px) and (max-width: 1024px) {
    &:before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      top: 0;
      width: 50%;
      height: 100%;
      background: ${props => props.theme.colors.white};
      z-index: 0;
    }
  }
`
const StyledList = styled.ul`
  display: flex;
  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 2rem 0;
  }
`

const StyledItem = styled.li`
  margin: 0 1.5rem;
  @media (max-width: 1024px) {
    visibility: hidden;
    opacity: 0;
  }
  &:last-of-type {
    margin-right: 0;
  }
  &:last-of-type > a {
    padding-right: 0;
  }
  @media (max-width: 1200px) {
    margin: 0.5rem;
  }
`

const StyledLink = styled(GatsbyLink)`
  display: block;
  padding: 1rem;
  color: ${props => props.theme.colors.dark};
  font-size: 1.125rem;
  transition: color 0.2s ease 0s;
  &:hover {
    color: ${props => props.theme.colors.gold};
  }
  @media (max-width: 1024px) {
    font-size: 1.25rem;
    padding: 0.5rem 3rem;
  }
`

export default function NavLinks({ toggleMenu, isOpen }) {
  // GSAP
  let itemsLayer = useRef(null)
  let wrapperLayer = useRef(null)

  // Setup a timeline to use
  const [menuTL] = useState(
    gsap.timeline({
      paused: true,
      defaults: { ease: "power4.out" },
    })
  )

  const menuRefs = useRef([])
  menuRefs.current = []

  const addToRefs = el => {
    if (el && !menuRefs.current.includes(el)) {
      menuRefs.current.push(el)
    }
  }

  useEffect(() => {
    menuTL
      .set(wrapperLayer.current, { clearProps: "all" })
      .set(menuRefs.current, { clearProps: "all" })
      .to(wrapperLayer.current, { height: "auto", duration: 0.5 })
      .to(menuRefs.current, {
        autoAlpha: 1,
        x: 30,
        stagger: 0.1,
        ease: "power2",
      })
      .reverse()
  }, [])

  useEffect(() => {
    menuTL.reversed(!isOpen)
  }, [isOpen])

  return (
    <StyledNavWrapper ref={wrapperLayer}>
      <StyledList ref={itemsLayer}>
        {navItemsData.map(item => (
          <StyledItem key={item.name} ref={addToRefs}>
            <StyledLink to={item.path}>{item.name}</StyledLink>
          </StyledItem>
        ))}
      </StyledList>
    </StyledNavWrapper>
  )
}
