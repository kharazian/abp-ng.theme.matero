import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <a class="d-inline-block text-nowrap r-full text-reset" href="/">
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAmVBMVEX////+/v79/f3Wp6zs0tXjwsa9XmuwRFD6+vq2U1/x4OLLh47dr7XBaXb27e6wSVTUmqDVn6Xv2t3Kf4fds7nGdoDPjZSrN0bIeoPDbnm2UV358/Tc3Ny6urpWVlZISEiOjo7u7u5xcXE/Pz+vr6+lpaXq6uopKSldXV0bGxsREREHBwfNzc0yMjJ6enqCgoIZGRnIyMifn593U8USAAABNUlEQVR4AWKgNgDwRRYHEAJBACMDrONu/Zd57sJrLFkF9gGJk30/VdqwA4h1PsBfnzSTvBDgF0RZia0jmjbvEvih605lRDhdNF6AjzEo1+ZEkNR9ywcBYuTUhggQm59KeA5B+qFNx4sFpjDT4EButTSqT4vcVoVclUSpKvZtM6c3oHBhjFm6kiuwqCDL2KdxL5cOU3LdXG4AQgTwuG3oud3k9ceQwtw6S87Ph3204TcAj1uu2ynn2B5ZGzAAw0BQUuUhzMy0/27BNiPkq6fupNJkrNPkPQ9k4vfgkjSUiwHAKhqzso/AU9ZoC8PJAZrJi5LVCLiLJBnQLpKOxeQ47ghQ+LK8jsQAiyjGF7s5To1rl2AqATiVulikI6A3J2K/HMEfJrm2p/gI5zDEn/iZideeb/zrCYtMF6x1O8R6AAAAAElFTkSuQmCC" class="brand-logo align-middle m-2" alt="logo" />
      <span class="align-middle f-s-16 f-w-500 m-x-8">Canada Royal Milk</span>
    </a>
  `,
  styles: [
    `
      .brand-logo {
        width: 30px;
        height: 30px;
      }
    `,
  ],
})
export class BrandingComponent {}
