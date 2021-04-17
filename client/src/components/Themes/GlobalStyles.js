import { createGlobalStyle } from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }
  & .ui.segment.menu {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    border: 1px solid lightgrey
   
  }
  & .ui.large.header.menu-title {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }
  & .ui.medium.header.course-title {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }

  & div.ui.segment.cart {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    border: 1px solid lightgrey
  }

  & div.cart.body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }

  & ol.ui.list li:before {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }

  & div.ui.medium.dividing.header {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }

  & div.ui.small.header {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }

  & li::before {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
}

& label.login-email-label {
  color: ${({ theme }) => theme.text};
  transition all .50s linear;
}

& label.user-first-label {
  color: ${({ theme }) => theme.text};
  transition all .50s linear;
}

& .menu-cards {
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
}

& .login-createUser {
  color: ${({ theme }) => theme.a};
}

& .login-createUser:before {
  background: ${({ theme }) => theme.a};
  color: ${({ theme }) => theme.a};
}

& .checkout-link {
  color: ${({ theme }) => theme.a};
}

& .checkout-link:hover {
  color: ${({ theme }) => theme.a};
}

& .checkout-link:before {
  background: ${({ theme }) => theme.a};
  color: ${({ theme }) => theme.a};
}

& .close {
  color: ${({ theme }) => theme.a};
}

& .menuLink {
  color: ${({ theme }) => theme.a};
}

& .menuLink:hover {
  color: ${({ theme }) => theme.a};
}

& #cart-btn {
  background: ${({ theme }) => theme.a};
}

& .ui.horizontal.segments {
  background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    border: 1px solid lightgrey
}
& div.accordion.ui.fluid.styled {
background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    border: 1px solid lightgrey
}

& i.dropdown.icon {
  color: ${({ theme }) => theme.text};
}

& .owner-menu-title {
  color: ${({ theme }) => theme.text};
}

& thead {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    border: 1px solid lightgrey
}

& tr:hover {
  color: ${({ theme }) => theme.a};
}

& .preview-price {
  color: ${({ theme }) => theme.text};
}

& .ui.form .field>label {
  color: ${({ theme }) => theme.text};
}

& table.ui.selectable.striped.compact.table {
  background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    border: 1px solid lightgrey;
}

& .owner-tr:hover {
  background: lightgrey;
  cursor: pointer;
}
`
