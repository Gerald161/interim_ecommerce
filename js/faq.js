document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));

        // Toggle the clicked FAQ item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});