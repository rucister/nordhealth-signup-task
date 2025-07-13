import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PasswordStrength from '~/components/PasswordStrength.vue'

// Mock nord components as regular divs
const globalComponents = {
  'nord-stack': {
    template: '<div class="nord-stack"><slot /></div>',
    props: ['direction', 'gap']
  }
}

describe('PasswordStrength Component', () => {
  it('should render with default props', () => {
    const wrapper = mount(PasswordStrength, {
      props: { password: '' },
      global: { components: globalComponents }
    })
    
    expect(wrapper.exists()).toBe(true)
		expect( wrapper.find( 'nord-stack' ).exists() ).toBe( true )
  })

  it('should show initial state for empty password', () => {
    const wrapper = mount(PasswordStrength, {
      props: { password: '' },
      global: { components: globalComponents }
    })
    
    const bars = wrapper.findAll('.strength-bar')
    expect(bars).toHaveLength(4)
    
    // All bars should not have 'active' class for empty password
    bars.forEach(bar => {
      expect(bar.classes()).not.toContain('active')
    })
    
		expect( wrapper.find( '.strength-label' ).text() ).toBe( 'Enter a strong password' )
  })

  it('should show weak strength for short password', () => {
    const wrapper = mount(PasswordStrength, {
      props: { password: 'abc' },
      global: { components: globalComponents }
    })
    
    const bars = wrapper.findAll('.strength-bar')
    
    // First bar should be active, rest not
    expect(bars[0].classes()).toContain('active')
    for (let i = 1; i < 4; i++) {
      expect(bars[i].classes()).not.toContain('active')
    }
    
		expect( wrapper.find( '.strength-label' ).text() ).toBe( 'Weak' )
  })

  it('should show fair strength for medium password', () => {
    const wrapper = mount(PasswordStrength, {
      props: { password: 'password' },
      global: { components: globalComponents }
    })
    
    const bars = wrapper.findAll('.strength-bar')
    
    // First two bars should be active, rest not
    expect(bars[0].classes()).toContain('active')
    expect(bars[1].classes()).toContain('active')
    expect(bars[2].classes()).not.toContain('active')
    expect(bars[3].classes()).not.toContain('active')
    
		expect( wrapper.find( '.strength-label' ).text() ).toBe( 'Fair' )
  })

  it('should show good strength for medium-strong password', () => {
    const wrapper = mount(PasswordStrength, {
      props: { password: 'Password' }, // This should give strength 3
      global: { components: globalComponents }
    })
    
    const bars = wrapper.findAll('.strength-bar')
    
    // First three bars should be active, last not
    expect(bars[0].classes()).toContain('active')
    expect(bars[1].classes()).toContain('active')
    expect(bars[2].classes()).toContain('active')
    expect(bars[3].classes()).not.toContain('active')
    
		expect( wrapper.find( '.strength-label' ).text() ).toBe( 'Good' )
  })

  it('should show strong strength for very strong password', () => {
    const wrapper = mount(PasswordStrength, {
      props: { password: 'MyPassword123!' },
      global: { components: globalComponents }
    })
    
    const bars = wrapper.findAll('.strength-bar')
    
    // All bars should be active
    bars.forEach(bar => {
      expect(bar.classes()).toContain('active')
    })
    
		expect( wrapper.find( '.strength-label' ).text() ).toBe( 'Strong' )
  })

  it('should show strong strength for Password123 (4 criteria met)', () => {
    const wrapper = mount(PasswordStrength, {
      props: { password: 'Password123' }, // 8+ chars + uppercase + lowercase + numbers = 4
      global: { components: globalComponents }
    })
    
    const bars = wrapper.findAll('.strength-bar')
    
    // All bars should be active for strength 4
    bars.forEach(bar => {
      expect(bar.classes()).toContain('active')
    })
    
		expect( wrapper.find( '.strength-label' ).text() ).toBe( 'Strong' )
  })

  it('should have proper CSS custom properties for colors', () => {
    const wrapper = mount(PasswordStrength, {
      props: { password: 'MyPassword123!' },
      global: { components: globalComponents }
    })
    
    const activeBars = wrapper.findAll('.strength-bar.active')
    expect(activeBars).toHaveLength(4)
    
    // Check that bars have the --strength-color custom property set
    activeBars.forEach(bar => {
      expect(bar.attributes('style')).toContain('--strength-color')
    })
  })

  it('should update when password prop changes', async () => {
    const wrapper = mount(PasswordStrength, {
      props: { password: 'weak' },
      global: { components: globalComponents }
    })
    
		expect( wrapper.find( '.strength-label' ).text() ).toBe( 'Weak' )
    
    await wrapper.setProps({ password: 'StrongPassword123!' })
    
		expect( wrapper.find( '.strength-label' ).text() ).toBe( 'Strong' )
  })

  it('should render correct number of strength bars', () => {
    const wrapper = mount(PasswordStrength, {
      props: { password: 'test' },
      global: { components: globalComponents }
    })
    
    const bars = wrapper.findAll('.strength-bar')
    expect(bars).toHaveLength(4)
  })
})
